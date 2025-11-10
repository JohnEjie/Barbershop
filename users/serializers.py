from rest_framework import serializers
from .models import CustomUser


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    name = serializers.CharField(required=True)
    
    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'name', 'phone_number', 'role']  # Changed phone to phone_number
    
    def create(self, validated_data):
        name = validated_data.pop('name')
        # Split name into first_name and last_name
        name_parts = name.split(' ', 1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ''
        
        user = CustomUser.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name,
            phone_number=validated_data.get('phone_number', ''),  # Changed phone to phone_number
            role=validated_data.get('role', 'customer')
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'name', 'phone_number', 'role']  # Changed phone to phone_number
    
    def get_name(self, obj):
        return obj.get_full_name()