import service from './service';
import { BENEFIT_TYPE, PROMOTION_TYPE } from '../../middleware/enum';
import logger from '../../apphandler/logger';

const getPromotions = async(req, res) => {
    const response = { status: false };
    try {
        const seriveResponse = await service.getPromotions();
        res.status(200).send(seriveResponse);
    } catch (e) {
        logger.info("Error in handler getPromotions() - " + e.message);
        response.message = e.message;
        return response;
    }
}

const createPlan = async(req, res) => {
    const response = { status: false };
    try {
        const {name, amount, tenure, benefit_percentage, benefit_type} = req.body;
        const planRequestObj = {
            name,
            amount: amount,
            tenure: tenure,
            benefitPercentage: benefit_percentage,
            benefitType: benefit_type || BENEFIT_TYPE.NONE
        };
        const seriveResponse = await service.createPlan(planRequestObj);
        res.status(200).send(seriveResponse);
    } catch (e) {
        logger.info("Error in handler createPlan() - " + e.message);
        response.message = e.message;
        return response;
    }
}

const createPromotion = async(req, res) => {
    const response = { status: false };
    try {
        const { plan_id, promotion_type, benefit_percentage, no_of_users, start_date, end_date } = req.body;
        const promotionRequestObj = {
            planId: plan_id,
            benefitPercentage: benefit_percentage,
            promotionType: promotion_type || PROMOTION_TYPE.NONE,
            noOfUsers: no_of_users,
            startDate: new Date(start_date) || new Date(),
            endDate: new Date(end_date) || null
        };
        const seriveResponse = await service.createPromotion(promotionRequestObj);
        res.status(200).send(seriveResponse);
    } catch (e) {
        logger.info("Error in handler createPromotion() - " + e.message);
        response.message = e.message;
        return response;
    }
}

export default {
    createPlan, 
    createPromotion,
    getPromotions
}