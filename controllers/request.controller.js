import RequestService from "../services/request.service.js";

async function createRequest(req, res, next) {
  try {
    let request = req.body;

    /*
    if (account.balance == null || !account.name) {
      throw new Error("'name' or 'balance' property has been missing.");
    }
    */

    request = await RequestService.createRequest(request);

    res.send(request);
  } catch (error) {
    next(error);
  }
}

async function updateRequest(req, res, next) {
  try {
    let request = req.body;
    /*
    if (request.balance == null || !request.name) {
      throw new Error("'name' or 'balance' property has been missing.");
    }
    */
    res.send(await RequestService.updateRequest(request));
  } catch (error) {
    next(error);
  }
}

async function updateRequestStatus(req, res, next) {
  try {
    let request = req.body;
    /*
    if (request.balance == null || !request.name) {
      throw new Error("'name' or 'balance' property has been missing.");
    }
    */
    res.send(await RequestService.updateRequestStatus(request));
  } catch (error) {
    next(error);
  }
}

async function deleteRequest(req, res, next) {
  try {
    await RequestService.deleteRequest(req.params.id);
    res.end();
  } catch (error) {
    next(error);
  }
}

async function getRequest(req, res, next) {
  try {
    res.send(await RequestService.getRequest(req.params.id));
  } catch (error) {
    next(error);
  }
}

async function getTotalSpendPerClient(req, res, next) {
  try {
    let { cliente } = req.body;
    res.send(await RequestService.getTotalSpendPerClient(cliente));
  } catch (error) {
    next(error);
  }
}

async function getTotalSalesPerProductDelivered(req, res, next) {
  try {
    let { produto } = req.body;
    res.send(await RequestService.getTotalSalesPerProductDelivered(produto));
  } catch (error) {
    next(error);
  }
}

async function getProductsMostDelivered(_req, res, next) {
  try {
    res.send(await RequestService.getProductsMostDelivered());
  } catch (error) {
    next(error);
  }
}

export default {
  createRequest,
  updateRequest,
  updateRequestStatus,
  deleteRequest,
  getRequest,
  getTotalSpendPerClient,
  getTotalSalesPerProductDelivered,
  getProductsMostDelivered,
};
