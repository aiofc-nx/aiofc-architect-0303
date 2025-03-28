# nodejs的请求响应机制

## 概述

抛开框架，回到 Node.js 本身，一个请求到响应的过程是基于 Node.js 的核心模块 `http` 或 `https` 实现的。以下是 Node.js 中从请求到响应的详细过程：

---

### **1. 创建 HTTP 服务器**

Node.js 使用 `http.createServer()` 方法创建一个 HTTP 服务器。该方法接受一个回调函数，用于处理每个传入的请求。

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // 请求处理逻辑
});
```

---

### **2. 监听端口**

服务器需要监听一个端口，以便接收客户端的请求。

```javascript
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

---

### **3. 请求接收**

当客户端发起 HTTP 请求时，Node.js 会触发 `http.createServer()` 中的回调函数。回调函数接收两个参数：

* `req`：请求对象（`IncomingMessage`），包含请求的详细信息（如 URL、HTTP 方法、请求头等）。
* `res`：响应对象（`ServerResponse`），用于向客户端发送响应。

---

### **4. 解析请求**

在回调函数中，可以通过 `req` 对象解析请求的详细信息：

* **URL**：`req.url` 获取请求的路径。
* **HTTP 方法**：`req.method` 获取请求的 HTTP 方法（如 `GET`、`POST`）。
* **请求头**：`req.headers` 获取请求头信息。
* **请求体**：对于 `POST` 或 `PUT` 请求，需要通过 `req.on('data')` 和 `req.on('end')` 事件流式读取请求体。

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Request URL:', req.url);
  console.log('Request Method:', req.method);
  console.log('Request Headers:', req.headers);

  let body = '';
  req.on('data', (chunk) => {
    body += chunk; // 读取请求体
  });

  req.on('end', () => {
    console.log('Request Body:', body);
    // 处理请求并发送响应
  });
});
```

---

### **5. 路由处理**

在 Node.js 中，路由需要手动实现。通常通过 `req.url` 和 `req.method` 来判断请求的路径和方法，并执行相应的逻辑。

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Get all users' }));
  } else if (req.url === '/users' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User created', data: body }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});
```

---

### **6. 发送响应**

通过 `res` 对象向客户端发送响应：

* **设置状态码和响应头**：使用 `res.writeHead()` 方法。
* **发送响应体**：使用 `res.write()` 或 `res.end()` 方法。
  * `res.write()`：可以多次调用，用于发送分块的响应体。
  * `res.end()`：结束响应，并可选地发送最后一块数据。

```javascript
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end('Hello, World!');
```

---

### **7. 处理错误**

在请求处理过程中，可能会发生错误（如无效的路由、服务器内部错误等）。可以通过 `try-catch` 或监听 `error` 事件来处理错误。

```javascript
const server = http.createServer((req, res) => {
  try {
    if (req.url === '/error') {
      throw new Error('Something went wrong!');
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});
```

---

### **8. 关闭服务器**

可以通过 `server.close()` 方法关闭服务器，停止接收新的请求。

```javascript
server.close(() => {
  console.log('Server is closed');
});
```

---

### **完整示例**

以下是一个完整的 Node.js HTTP 服务器示例：

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Request URL:', req.url);
  console.log('Request Method:', req.method);

  if (req.url === '/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Get all users' }));
  } else if (req.url === '/users' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User created', data: body }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

---

### **总结**

在 Node.js 中，请求到响应的过程主要包括以下步骤：

1. 创建 HTTP 服务器并监听端口。
2. 接收请求并解析请求信息（如 URL、方法、请求头、请求体等）。
3. 根据请求的路径和方法实现路由逻辑。
4. 发送响应（包括状态码、响应头和响应体）。
5. 处理错误并关闭服务器。

这个过程是 Node.js 的核心，框架（如 Express、NestJS）只是在此基础上提供了更高层次的抽象和工具。理解这个过程有助于更好地掌握 Node.js 的工作原理。
