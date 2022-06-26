# Tortoise-Assignment

# Flow

## Admin

- Create plans with default benefit_percentages (10%, 15% ...)
- Create promotions

### Schema for Plans

| id  | name     | amount_option | tenure_option (in days) | benefit_percentage (default) | benefit_type |
| --- | -------- | ------------- | ----------------------- | ---------------------------- | ------------ |
| 1   | Student  | 1000           | 40                      | 3                            | CASHBACK     |
| 2   | Employee | 2000           | 90                     | 12                           | VOUCHER      |

### Schema for Promotions

| id  | benefit_percentage | promotion_type  | no_of_users | start_date | end_date |
| --- | ------------------ | --------------- | ----------- | ---------- | -------- |
| 1   | 30                 | LIMIT_BY_USER   | 5           | null       | null     |
| 2   | 70                 | LIMIT_BY_PERIOD | null        | 25/06/22   | 26/06/22 |


## Customers

- Store customer data in customers table (Login/signup).
- Enroll customer into any of the plans.
- Customer can apply promotions while enrolling in the plan.

### Schema for Customers

| id  | name        | email           | mobile    |
| --- | ----------- | --------------- | --------- |
| 1   | Swami     | null            | null      |
| 2   | Demuxd   | abc@gmail.com   | 9876543228 |
| 3   | Demux | def@gmail.com | null      |

### Schema for CustomerGoals

| id  | plan_id | user_id | selected_amount | selected_tenure | start_date | deposited_amount | benefit_percentage | benefit_type | applied_promotion | promotion_type  |
| --- | ------- | ------- | --------------- | --------------- | ---------- | ---------------- | ------------------ | ------------ | ----------------- | --------------- |
| 1   | 1       | 1       | 1000             | 40              | 25/06/22   | 2000             | 3                  | CASHBACK     | false             | LIMIT_BY_USER   |
| 2   | 1       | 4       | 2000             | 500              | 25/06/22   | 3000              | 20                 | CASHBACK     | true              | LIMIT_BY_USER   |
| 3   | 2      | 5       | 4000             | 90             | 26/06/22   | 5000             | 50                 | VOUCHER      | true              | LIMIT_BY_PERIOD |
