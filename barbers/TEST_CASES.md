# Barber Module Test Cases Documentation

## Test Case 1

**Test Case ID:** TC-BARBER-001

**Modules:** Barber Model, CustomUser Model

**Test Scenario:** Verify that a barber profile can be created and properly linked to a CustomUser

**Test Name:** test_barber_creation

**Preconditions:**
- Django application is running
- Database is accessible
- CustomUser model is available
- Barber model is available

**Test Procedures:**
1. Create a CustomUser with username="barber1", email="barber1@example.com", password="testpass123", role="barber"
2. Create a Barber profile linked to the user with:
   - bio="Professional barber with 5 years of experience"
   - experience_years=5
   - specialization="Fade cuts and modern styles"
3. Verify barber.user equals the created CustomUser
4. Verify barber.user.username equals "barber1"
5. Verify barber.user.role equals "barber"
6. Verify barber.bio equals "Professional barber with 5 years of experience"
7. Verify barber.experience_years equals 5
8. Verify barber.specialization equals "Fade cuts and modern styles"

**Expected Result:**
- Barber profile is successfully created
- All field values match the input values
- Barber is properly linked to the CustomUser

**Actual Result:** [To be filled during testing]

**Status:** [Pass/Fail]

**Testing Type:** Unit Test, Functional Test

---

## Test Case 2

**Test Case ID:** TC-BARBER-002

**Modules:** Barber Model

**Test Scenario:** Verify the string representation of a Barber instance

**Test Name:** test_barber_str_method

**Preconditions:**
- Barber instance exists
- Barber is linked to a CustomUser with username="barber1"

**Test Procedures:**
1. Create a Barber instance linked to a CustomUser with username="barber1"
2. Call str() function on the barber instance
3. Verify the result equals "barber1"

**Expected Result:**
- String representation returns the username of the linked user ("barber1")

**Actual Result:** [To be filled during testing]

**Status:** [Pass/Fail]

**Testing Type:** Unit Test

---

## Test Case 3

**Test Case ID:** TC-BARBER-003

**Modules:** Barber Model

**Test Scenario:** Verify that barber fields have correct default values when created with minimal data

**Test Name:** test_barber_default_values

**Preconditions:**
- CustomUser model is available
- Barber model is available

**Test Procedures:**
1. Create a CustomUser with username="barber2", password="testpass123", role="barber"
2. Create a Barber instance with only the user field (minimal creation)
3. Verify experience_years equals 0 (default value)
4. Verify bio equals "" (empty string, default)
5. Verify specialization equals "" (empty string, default)
6. Clean up created instances

**Expected Result:**
- Barber is created successfully with default values:
  - experience_years = 0
  - bio = ""
  - specialization = ""

**Actual Result:** [To be filled during testing]

**Status:** [Pass/Fail]

**Testing Type:** Unit Test, Boundary Test

---

## Test Case 4

**Test Case ID:** TC-BARBER-004

**Modules:** Barber Model, CustomUser Model

**Test Scenario:** Verify OneToOneField relationship constraint - one user can only have one barber profile

**Test Name:** test_barber_one_to_one_relationship

**Preconditions:**
- Barber instance exists and is linked to a CustomUser
- Database integrity constraints are enforced

**Test Procedures:**
1. Create a Barber instance linked to a CustomUser
2. Verify that barber.user.barber equals the barber instance (reverse relationship works)
3. Attempt to create another Barber instance with the same user
4. Verify that an exception (IntegrityError) is raised

**Expected Result:**
- Reverse relationship (user.barber) correctly returns the barber instance
- Attempting to create a second barber with the same user raises an IntegrityError
- OneToOneField constraint is properly enforced

**Actual Result:** [To be filled during testing]

**Status:** [Pass/Fail]

**Testing Type:** Unit Test, Integration Test, Negative Test

---

## Test Case 5

**Test Case ID:** TC-BARBER-005

**Modules:** Barber Model

**Test Scenario:** Verify that bio and specialization fields can accept blank/empty values

**Test Name:** test_barber_blank_fields

**Preconditions:**
- CustomUser model is available
- Barber model is available

**Test Procedures:**
1. Create a CustomUser with username="barber3", password="testpass123", role="barber"
2. Create a Barber instance with:
   - user = created user
   - bio = "" (empty string)
   - specialization = "" (empty string)
3. Verify barber.bio equals ""
4. Verify barber.specialization equals ""
5. Clean up created instances

**Expected Result:**
- Barber is created successfully with blank bio and specialization fields
- Both fields accept and store empty strings

**Actual Result:** [To be filled during testing]

**Status:** [Pass/Fail]

**Testing Type:** Unit Test, Boundary Test

---

## Test Case 6

**Test Case ID:** TC-BARBER-006

**Modules:** Barber Model, CustomUser Model

**Test Scenario:** Verify cascade delete behavior - deleting a user also deletes the associated barber profile

**Test Name:** test_barber_cascade_delete

**Preconditions:**
- Barber instance exists and is linked to a CustomUser
- Database cascade delete is configured

**Test Procedures:**
1. Create a Barber instance linked to a CustomUser
2. Store the barber ID and user ID
3. Delete the CustomUser
4. Verify that the Barber instance no longer exists (using barber ID)
5. Verify that the CustomUser no longer exists (using user ID)

**Expected Result:**
- Deleting the user automatically deletes the associated barber profile
- Both records are removed from the database
- Cascade delete works correctly

**Actual Result:** [To be filled during testing]

**Status:** [Pass/Fail]

**Testing Type:** Unit Test, Integration Test

---

## Test Case 7

**Test Case ID:** TC-BARBER-007

**Modules:** Barber Model, Appointment Model

**Test Scenario:** Verify pending_appointments_details property returns correct message when no appointments exist

**Test Name:** test_pending_appointments_details_no_appointments

**Preconditions:**
- Barber instance exists
- No appointments are associated with the barber

**Test Procedures:**
1. Create a Barber instance
2. Call the pending_appointments_details property
3. Verify the result equals "No pending appointments"

**Expected Result:**
- Property returns the string "No pending appointments" when no appointments exist

**Actual Result:** [To be filled during testing]

**Status:** [Pass/Fail]

**Testing Type:** Unit Test, Functional Test

---

## Test Case 8

**Test Case ID:** TC-BARBER-008

**Modules:** Barber Model, Appointment Model, CustomUser Model

**Test Scenario:** Verify pending_appointments_details property returns list of pending appointments with correct format

**Test Name:** test_pending_appointments_details_with_pending

**Preconditions:**
- Barber instance exists
- At least one customer user exists
- Appointment model is available

**Test Procedures:**
1. Create a Barber instance
2. Create a customer user (customer1)
3. Create first appointment with status="pending" for the barber and customer1
4. Create second customer user (customer2)
5. Create second appointment with status="pending" for the barber and customer2
6. Call the pending_appointments_details property
7. Verify the result is a list
8. Verify the list contains 2 items ordered by appointment_date ascending
9. Verify each item contains the customer username and "on" keyword
10. Verify format includes customer username and appointment date/time
11. Clean up second customer

**Expected Result:**
- Property returns a list containing 2 items in chronological order
- Each item follows the format: "username on YYYY-MM-DD HH:MM"
- Both pending appointments are included

**Actual Result:** [To be filled during testing]

**Status:** [Pass/Fail]

**Testing Type:** Unit Test, Functional Test, Case-Insensitive Filter Test

---

## Test Case 9

**Test Case ID:** TC-BARBER-009

**Modules:** Barber Model, Appointment Model

**Test Scenario:** Verify pending_appointments_details property only returns pending appointments and excludes other statuses

**Test Name:** test_pending_appointments_details_excludes_non_pending

**Preconditions:**
- Barber instance exists
- Customer user exists
- Appointment model supports multiple statuses

**Test Procedures:**
1. Create a Barber instance
2. Create a customer user
3. Create an appointment with status="pending"
4. Create an appointment with status="Completed"
5. Create an appointment with status="Cancelled"
6. Call the pending_appointments_details property
7. Verify the result is a list
8. Verify the list contains only 1 item
9. Verify the item contains "customer1 on" (from pending appointment)
10. Verify completed and cancelled appointments are not included

**Expected Result:**
- Property returns a list with only 1 item (the pending appointment)
- Completed and cancelled appointments are excluded
- Only appointments saved with the "pending" status value are included

**Actual Result:** [To be filled during testing]

**Status:** [Pass/Fail]

**Testing Type:** Unit Test, Functional Test, Filter Test

---

## Test Case 10

**Test Case ID:** TC-BARBER-010

**Modules:** Barber Model, Appointment Model

**Test Scenario:** Verify pending_appointments_details property returns appointments in correct date/time format

**Test Name:** test_pending_appointments_details_format

**Preconditions:**
- Barber instance exists
- Customer user exists
- Appointment model is available

**Test Procedures:**
1. Create a Barber instance
2. Create a customer user
3. Create a specific datetime: 2024-01-15 14:30
4. Create an appointment with:
   - customer = customer1
   - barber = barber instance
   - appointment_date = 2024-01-15 14:30
   - status = "pending" (any casing)
5. Call the pending_appointments_details property
6. Verify the result is a list
7. Verify the list contains 1 item
8. Verify the item exactly equals "customer1 on 2024-01-15 14:30"

**Expected Result:**
- Property returns a list with 1 item
- The item format is exactly: "customer1 on 2024-01-15 14:30"
- Date and time are formatted as YYYY-MM-DD HH:MM

**Actual Result:** [To be filled during testing]

**Status:** [Pass/Fail]

**Testing Type:** Unit Test, Functional Test, Format Test

---

## Test Case 11

**Test Case ID:** TC-BARBER-011

**Modules:** Barber Admin, Barber Model, Appointment Model

**Test Scenario:** Verify admin list display shows all pending appointments (case-insensitive, ordered)

**Test Name:** BarberAdmin.pending_appointments display

**Preconditions:**
- Django admin site is accessible
- User with staff access is logged into admin
- Barber instance exists with at least two appointments having status variants of "pending"

**Test Procedures:**
1. In Django admin, navigate to the Barber list page
2. Ensure the target barber has two appointments with status value "pending" occurring at different times
3. Observe the "Pending Appointments" column for that barber
4. Verify both appointments appear, each on its own line, ordered by appointment_date ascending

**Expected Result:**
- Admin column shows both pending appointments regardless of status casing
- Entries are separated by line breaks and include customer username and formatted datetime

**Actual Result:** [To be filled during testing]

**Status:** [Pass/Fail]

**Testing Type:** Functional Test, UI Verification, Case-Insensitive Filter Test

---

## Test Summary

**Total Test Cases:** 11

**Test Categories:**
- Unit Tests: 10
- Functional Tests: 7
- Integration Tests: 2
- Boundary Tests: 2
- Negative Tests: 1
- Filter Tests: 2
- Format Tests: 1
- UI Verification: 1

**Test Coverage:**
- Barber model creation and validation
- Barber field defaults and constraints
- OneToOneField relationship
- Cascade delete functionality
- Admin pending appointments display (case-insensitive)
- pending_appointments_details property (all scenarios)
- String representation
- Field blank/null handling

