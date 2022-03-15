import RequestRepository from "../repositories/request.repository.js";

async function createRequest(request) {
  return await RequestRepository.insertRequest(request);
}

async function updateRequest(request) {
  return await RequestRepository.updateRequest(request);
}

async function updateRequestStatus(request) {
  return await RequestRepository.updateRequestStatus(request);
}

async function deleteRequest(id) {
  return await RequestRepository.deleteRequest(id);
}

async function getRequest(id) {
  return await RequestRepository.getRequest(id);
}

async function getTotalSpendPerClient(client) {
  return await RequestRepository.getTotalSpendPerClient(client);
}

async function getTotalSalesPerProductDelivered(product) {
  return await RequestRepository.getTotalSalesPerProductDelivered(product);
}

async function getProductsMostDelivered() {
  return await RequestRepository.getProductsMostDelivered();
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
