import { getAllPromotions, addPlan, getPlanById, addPromotion } from './model';
import { PLAN_CREATED_SUCESSFULLY, INVALID_PLAN, INVALID_REQUEST, PROMOTION_CREATED_SUCESSFULLY } from '../../middleware/constant';
import { BENEFIT_TYPE, PROMOTION_TYPE } from '../../middleware/enum';
import { info } from '../../apphandler/logger';

const getPromotions = async () => {
    const response = { status: false };
    try {
        const promotionsQueryRes = await getAllPromotions(); 
        response.status = true;
        response.data = promotionsQueryRes.rows;
        return response;
    } catch (e) {
        info("Error in service getPromotions() - " + e.message);
        response.message = e.message;
        return response;
    }
}

const createPlan = async(planDetails) => {
    const response = { status: false };
    try {
        await addPlan(planDetails);
        response.message = PLAN_CREATED_SUCESSFULLY;
        response.status = true;
        return response;
    } catch (e) {
        info("Error in service createPlan() - " + e.message);
        response.message = e.message;
        return response;
    }
}

const checkPlanValidity = async(planId) => {
    try {
        const isPlanValidQueryRes = await getPlanById(planId);
        const planExists = isPlanValidQueryRes.rowCount;
        if (planExists) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        info("Error in service checkPlanValidity() - " + e.message);
        throw e;
    }
}

// Promotion can be limited in two ways
// i. By the number of users to get the promotion (for example: 500 users)
// ii. By a time period (for example: 22th May 2022 to 24th May 2022)
// b. Assume that promotion can only affect benefitPercentage for a given plan

const userPromotionHelper = (noOfUsers) => {
    try {
        if (noOfUsers && noOfUsers > 0) {
            return true;
        }
        return false;
    } catch (e) {   
        info("Error in service userPromotionHelper() - " + e.message);
        throw e;
    }
}

const periodPromotionHelper = (startDate, endDate) => {
    try {
        if (startDate && endDate && endDate > startDate) {
            return true;
        } 
        return false;
    } catch (e) {   
        info("Error in service periodPromotionHelper() - " + e.message);
        throw e;
    }
}

const createPromotion = async(promotionDetails) => {
    const response = { status: false };
    try {
        const {planId, promotionType, noOfUsers, startDate, endDate} = promotionDetails;
        const isPlanValid = await checkPlanValidity(planId); 
        if (!isPlanValid) {
            response.message = INVALID_PLAN;
            return response;
        }

        let isPromotionValid = null;
        if (promotionType === PROMOTION_TYPE.LIMIT_BY_USERS) {
            isPromotionValid = userPromotionHelper(noOfUsers);
        } else if (promotionType === PROMOTION_TYPE.LIMIT_BY_PERIOD) {
            isPromotionValid = periodPromotionHelper(startDate, endDate);
        } else {
            response.message = INVALID_REQUEST;
            return response;
        }

        if (!isPromotionValid) {
            response.message = INVALID_REQUEST;
            return response;
        }
        
        await addPromotion(promotionDetails);
        response.status = true;
        response.message = PROMOTION_CREATED_SUCESSFULLY;
        return response;
    } catch (e) {
        info("Error in service createPromotion() - " + e.message);
        response.message = e.message;
        return response;
    }
}

export default {
    createPlan, 
    createPromotion,
    checkPlanValidity,
    getPromotions
}