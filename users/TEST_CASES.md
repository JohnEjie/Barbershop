# Users Module Test Cases Documentation

## Test Case 1
- **Test Case ID**: TC-USERS-001
- **Modules**: CustomUser Model, CustomUserManager
- **Test Scenario**: Create a superuser and verify flags and role
- **Test Name**: test_create_superuser
- **Preconditions**:
  - Django project configured and database accessible
  - `AUTH_USER_MODEL` points to `users.CustomUser`
- **Test Procedures**:
  1. Call `create_superuser(username='admin_test', email='admin@test.com', password='admin123')`.
  2. Fetch the created user.
  3. Verify `is_staff` is True, `is_superuser` is True, and `role` is `admin`.
  4. Verify password matches using `check_password('admin123')`.
- **Expected Resutl**:
  - User is created with `is_staff=True`, `is_superuser=True`, `role='admin'`.
  - Password check succeeds.
- **Actual Result**: [To be filled]
- **Status**: [Pass/Fail]
- **Testing type**: Unit, Functional

---

## Test Case 2
- **Test Case ID**: TC-USERS-002
- **Modules**: CustomUser Model, CustomUserManager
- **Test Scenario**: Create a normal user and verify defaults
- **Test Name**: test_create_user
- **Preconditions**:
  - Django project configured and database accessible
- **Test Procedures**:
  1. Call `create_user(username='customer_test', email='customer@test.com', password='cust123', role='customer')`.
  2. Verify `is_staff` is False and `is_superuser` is False.
  3. Verify `role` is `customer` and email set correctly.
  4. Verify password check succeeds.
- **Expected Resutl**:
  - User has staff and superuser flags False, role is `customer`, and password is set.
- **Actual Result**: [To be filled]
- **Status**: [Pass/Fail]
- **Testing type**: Unit, Functional

---

## Test Case 3
- **Test Case ID**: TC-USERS-003
- **Modules**: CustomUser Model, CustomUserManager
- **Test Scenario**: Default role should be `customer` when not provided
- **Test Name**: test_default_role_is_customer
- **Preconditions**:
  - None beyond base configuration
- **Test Procedures**:
  1. Call `create_user(username='no_role_user', email='norole@test.com', password='pass123')` without `role`.
  2. Verify `role` equals `customer`.
- **Expected Resutl**:
  - Role defaults to `customer`.
- **Actual Result**: [To be filled]
- **Status**: [Pass/Fail]
- **Testing type**: Unit, Boundary

---

## Test Case 4
- **Test Case ID**: TC-USERS-004
- **Modules**: CustomUser Model
- **Test Scenario**: String representation should include username and role
- **Test Name**: test_str_representation
- **Preconditions**:
  - None beyond base configuration
- **Test Procedures**:
  1. Create user `username='john'`, `role='barber'`.
  2. Call `str(user)`.
  3. Verify it equals `"john (barber)"`.
- **Expected Resutl**:
  - `__str__` returns `"<username> (<role>)"`.
- **Actual Result**: [To be filled]
- **Status**: [Pass/Fail]
- **Testing type**: Unit

---

## Test Case 5
- **Test Case ID**: TC-USERS-005
- **Modules**: CustomUserManager
- **Test Scenario**: Creating a user without a username should raise ValueError
- **Test Name**: test_create_user_without_username_raises
- **Preconditions**:
  - None beyond base configuration
- **Test Procedures**:
  1. Call `create_user(username='', email='nouser@test.com', password='pass123')`.
  2. Capture exception.
  3. Verify message equals `"The Username field is required"`.
- **Expected Resutl**:
  - `ValueError` is raised with the expected message.
- **Actual Result**: [To be filled]
- **Status**: [Pass/Fail]
- **Testing type**: Unit, Negative

---

## Test Case 6
- **Test Case ID**: TC-USERS-006
- **Modules**: CustomUser Admin, Appointment Model, Barber Model
- **Test Scenario**: Verify user admin column displays only pending appointment dates for a customer
- **Test Name**: CustomUserAdminAppointmentsTest.test_appointment_dates_excludes_completed
- **Preconditions**:
  - Admin site is configured
  - Customer user exists with at least one pending appointment and one completed appointment
  - Barber profile exists for appointments
- **Test Procedures**:
  1. Instantiate `CustomUserAdmin`
  2. Create customer user (`role='customer'`) and barber user (`role='barber'`), plus a `Barber` linked to the barber user
  3. Create one pending appointment (e.g., 2024-01-02 12:30) and one completed appointment (e.g., 2024-01-01 10:00) for the customer
  4. Call `appointment_dates` on the admin instance with the customer user
  5. Verify the return string shows only the pending appointment date formatted as `YYYY-MM-DD HH:MM`
- **Expected Resutl**:
  - `appointment_dates` returns `"2024-01-02 12:30"`
- **Actual Result**: [To be filled]
- **Status**: [Pass/Fail]
- **Testing type**: Functional, UI helper, Filter

---

## Test Case 7
- **Test Case ID**: TC-USERS-007
- **Modules**: CustomUser Admin, Appointment Model, Barber Model
- **Test Scenario**: Verify user admin column removes appointment dates once an appointment is completed
- **Test Name**: CustomUserAdminAppointmentsTest.test_appointment_dates_removed_after_completion
- **Preconditions**:
  - Admin site is configured
  - Customer user has at least one pending appointment
- **Test Procedures**:
  1. Instantiate `CustomUserAdmin`
  2. Create customer user and associated barber profile
  3. Create a single pending appointment (e.g., 2024-01-02 12:30)
  4. Call `appointment_dates` and verify the pending date is displayed
  5. Update the appointment status to `completed`
  6. Call `appointment_dates` again and verify it returns "No appointments"
- **Expected Resutl**:
  - Before completion: `appointment_dates` returns `"2024-01-02 12:30"`
  - After completion: returns `"No appointments"`
- **Actual Result**: [To be filled]
- **Status**: [Pass/Fail]
- **Testing type**: Functional, UI helper, Negative

---

## Test Summary
- **Total Test Cases**: 7
- **Coverage**:
  - Superuser creation and flags
  - Normal user creation and defaults
  - Default role behavior
  - String representation
  - Validation: required username
  - Admin appointment date display (pending only)
  - Admin appointment removal after completion
