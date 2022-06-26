import { query as _query } from "../../configs/db";

const addCustomer = async (customerDetails) => {
  try {
    const { name, email, mobile } = customerDetails;
    const query = "INSERT INTO user(name, email, mobile) VALUES($1,$2,$3)";
    const params = [name, email, mobile];
    await _query(query, params);
  } catch (e) {
    console.log("Error in model addCustomer " + e.message);
    throw e;
  }
};

const getAllPlans = async () => {
  try {
    const query = "SELECT * FROM plans";
    const params = [];
    return await _query(query, params);
  } catch (e) {
    console.log("Error in model getAllPlans " + e.message);
    throw e;
  }
};

const enrollUser = async (planDetails) => {
  try {
    const {
      planId,
      userId,
      amount,
      tenure,
      startedDate,
      depositedAmount,
      benefitPercentage,
      benefitType,
      promotionApplied,
      promotionType,
    } = planDetails;

    const query =
      "INSERT INTO customergoals(plan_id, user_id, selected_amount, selected_tenure," +
      "started_date, deposited_amount, benefit_percentage, benefit_type, promotion_applied, promotion_type)" +
      "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
    const params = [
      planId,
      userId,
      amount,
      tenure,
      startedDate,
      depositedAmount,
      benefitPercentage,
      benefitType,
      promotionApplied,
      promotionType,
    ];
    return await _query(query, params);
  } catch (e) {
    console.log("Error in model enrollUser " + e.message);
    throw e;
  }
};

const getPromotionDetailsById = async (promotionId) => {
  try {
    const query = "SELECT * FROM promotions p WHERE id=$1";
    const params = [promotionId];
    return await _query(query, params);
  } catch (e) {
    console.log(
      "Error in model getPromotionDetailsById" + e.message
    );
    throw e;
  }
};

const decreaseUserCount = async (promotionId, numUsers) => {
  try {
    const query = "UPDATE promotions SET no_of_users = $1 WHERE id = $2";
    const params = [numUsers, promotionId];
    await _query(query, params);
  } catch (e) {
    console.log("Error in model decreaseUserCount " + e.message);
    throw e;
  }
};

const getUsers = async (promotionId) => {
  try {
    const query = "SELECT total_users FROM promotions WHERE id = $1";
    const params = [promotionId];
    return await _query(query, params);
  } catch (e) {
    console.log("Error in model getUsers " + e.message);
    throw e;
  }
};

const updateTotalUserCount = async (userCount, promotionId) => {
  try {
    const query = "UPDATE promotions SET total_users = $1 WHERE id = $2";
    const params = [userCount, promotionId];
    await _query(query, params);
  } catch (e) {
    console.log(
      "Error in model updateTotalUserCount " + e.message
    );
    throw e;
  }
};

export default {
  getAllPlans,
  enrollUser,
  addCustomer,
  getPromotionDetailsById,
  decreaseUserCount,
  getUsers,
  updateTotalUserCount,
};