import { promises as fs } from "fs";
const { writeFile, readFile } = fs;

//caminho do arquivos que contem os pedidos
const requestJSON = "./resources/pedidos.json";

async function insertRequest(request) {
  const data = JSON.parse(await readFile(requestJSON));

  request = {
    id: data.nextId++,
    cliente: request.cliente,
    produto: request.produto,
    valor: request.valor,
    entregue: false,
    timestamp: new Date(),
  };

  data.pedidos.push(request);

  await writeFile(requestJSON, JSON.stringify(data, null, 2));

  return request;
}

async function updateRequest(request) {
  const data = JSON.parse(await readFile(requestJSON));
  const index = data.pedidos.findIndex((a) => a.id === request.id);

  if (index === -1) {
    throw new Error("request not found.");
  }

  data.pedidos[index].cliente = request.cliente;
  data.pedidos[index].produto = request.produto;
  data.pedidos[index].valor = request.valor;
  data.pedidos[index].entregue = request.entregue;

  await writeFile(requestJSON, JSON.stringify(data), null, 2);

  return data.pedidos[index];
}

async function updateRequestStatus(request) {
  const data = JSON.parse(await readFile(requestJSON));
  const index = data.pedidos.findIndex((a) => a.id === request.id);

  if (index === -1) {
    throw new Error("request not found.");
  }

  data.pedidos[index].entregue = request.entregue;

  await writeFile(requestJSON, JSON.stringify(data), null, 2);

  return data.pedidos[index];
}

async function deleteRequest(id) {
  const data = JSON.parse(await readFile(requestJSON));

  data.pedidos = data.pedidos.filter((pedido) => pedido.id !== parseInt(id));

  await writeFile(requestJSON, JSON.stringify(data, null, 2));

  return true;
}

async function getRequest(id) {
  const data = JSON.parse(await readFile(requestJSON));
  delete data.nextId;
  const request = data.pedidos.find((request) => request.id === parseInt(id));

  return request;
}

async function getTotalSpendPerClient(client) {
  const data = JSON.parse(await readFile(requestJSON));
  delete data.nextId;

  let total = 0;
  let myId = -1;

  data.pedidos.map(({ id, cliente, valor, entregue }) => {
    if (cliente === client) {
      if (entregue) {
        total += valor;
        myId = id;
      }
    }
  });

  let request = { message: "Client not found!" };
  if (myId > 0) {
    request = {
      id: myId,
      cliente: client,
      total: total,
    };
  }

  return request;
}

async function getTotalSalesPerProductDelivered(product) {
  const data = JSON.parse(await readFile(requestJSON));
  delete data.nextId;

  let total = 0;
  let myId = -1;

  data.pedidos.map(({ id, produto, valor, entregue }) => {
    if (produto === product) {
      if (entregue) {
        total += valor;
        myId = id;
      }
    }
  });

  let request = { message: "Product not found!" };
  if (myId > 0) {
    request = {
      produto: product,
      total: total,
    };
  }

  console.log(request);

  return request;
}

async function getProductsMostDelivered() {
  const data = JSON.parse(await readFile(requestJSON));
  delete data.nextId;

  let list = [];

  if (!data) {
    list = { message: "The list is empty" };
    return list;
  }

  data.pedidos.map(({ produto, entregue }) => {
    if (entregue) {
      let index = list.findIndex((object) => {
        return object.produto === produto;
      });

      if (index === -1) {
        list.push({ produto: produto, quantidade: 1 });
      } else {
        list[index].quantidade += 1;
      }
    }
  });

  list = list.sort((a, b) => {
    if (a.quantidade < b.quantidade) {
      return 1;
    } else if (a.quantidade > b.quantidade) {
      return -1;
    } else {
      return 0;
    }
  });

  list = list.map((object) => {
    return `${object.produto} - ${object.quantidade}`;
  });

  return { ...list };
}

export default {
  insertRequest,
  updateRequest,
  updateRequestStatus,
  deleteRequest,
  getRequest,
  getTotalSpendPerClient,
  getTotalSalesPerProductDelivered,
  getProductsMostDelivered,
};
