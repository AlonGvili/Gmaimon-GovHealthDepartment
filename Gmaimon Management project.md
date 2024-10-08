# Project Overview

### Hosting
company: [fly.io](https://fly.io)

| App | Name | IP | Port | Description | Amount |
| --- | --- | --- | --- | --- | --- |
| [web app](https://https://fly.io/apps/gmaimon-auraair) | gmaimon-auraair | `213.188.217.4` | `80` | `The main web application users and admin will use to manage the project and there data` | 1 |
| [database app](https://gmaimon.fly.io) | gm-pg-aa | `fdaa:0:3b7c:a7b:23c6:0:6147:2` | `5432` | `postgress database as webapp that the main app uses to store information like users, schools etc.` | 1 |



### Tech 
| Name | Description | Role |
| --- | --- | --- |
| [Fly.io](https://fly.io) | Fly.io is a cloud-based platform for hosting and managing your web applications. | Hosting |
| [Node.js](https://nodejs.org) | Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. | Backend Server |
| [Remix](https://remix.run) | Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. | React Framework |
| [PostgreSQL](https://www.postgresql.org) | PostgreSQL is a powerful, open source object-relational database system. | Database |
| [Prisma](https://www.prisma.io) | Next-generation Node.js and TypeScript ORM, Prisma helps app developers build faster and make fewer errors with an open source database toolkit for PostgreSQL, MySQL, SQL Server, and SQLite. | ORM |
| [GitHub](https://github.com) | GitHub is a development platform inspired by the way you work. From open source to business, you can host and review code, manage projects, and build software alongside millions of other developers. | Hosting Open Source Software |

### Tools
| Name | Description | Role |
| --- | --- | --- |
| [Git](https://git-scm.com) | Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency in mind. | Version Control |
| [vsCode](https://code.visualstudio.com) | Visual Studio Code is a code editor developed by Microsoft for Windows, Linux and macOS. | Code Editor |
| [flyctl CLI](https://fly.io/docs/cli) | flyctl is a command line interface for Fly.io. | CLI |
| [docker](https://www.docker.com) | Docker is a containerization engine for distributed applications. | Containerization |
| [WireGuard](https://wireguard.com)  | WireGuard is a network protocol for secure end-to-end encrypted communication between two or more computers. | VPN |

### Local Development
in the local development environment you can use the following tools to develop your project.

#### First you need to install the following tools: 
**`wireguard`, `docker`, `nodejs`, `vscode`, `git`, `flyctl`**
After the installation you need to load the **`basic.conf`** file in this repo into wireguard and click on the active button, this will create a vpn to fly.io, so you can work aginst the postgres database. 
`
#### Then you need to clone the project from github and run the app localy using following commands:

01. **open powershell window or terminal in you on linux or mac**

02. **clone the project into your local machine**
```
git clone https://github.com/AlonGvili/Gmaimon-GovHealthDepartment
```
03. **change directory into the project folder**
```
cd Gmaimon-GovHealthDepartment
```
04. **install project dependencies**
```
npm install
```
05. **run the web application**
```
npm run dev
```

> **Note:** You can use the **`npx prisma studio`** command to open a web base interface to manage your database or you can install [prisma studio](https://www.prisma.io/studio) as a regular software.

> **Importent:** when you working with the database the vpn is active or you will get errors that you can't reach the database.

### Web Application Routes
```jsx
<Routes>
  <Route file="root.tsx">
    <Route path="members/:idNumber/dashboard" file="routes\\members\\$idNumber\\dashboard.tsx">
      <Route path="supervisor" file="routes\\members\\$idNumber\\dashboard\\supervisor.tsx">
        <Route path="classes" file="routes\\members\\$idNumber\\dashboard\\supervisor\\classes.tsx" />
        <Route path="reports" file="routes\\members\\$idNumber\\dashboard\\supervisor\\reports.tsx" />
        <Route path="orders" file="routes\\members\\$idNumber\\dashboard\\supervisor\\orders.tsx" />
      </Route>
      <Route path="console" file="routes\\members\\$idNumber\\dashboard\\console.tsx" />
      <Route path="schools" file="routes\\members\\$idNumber\\dashboard\\schools.tsx" />
      <Route path="orders" file="routes\\members\\$idNumber\\dashboard\\orders.tsx" />
      <Route index file="routes\\members\\$idNumber\\dashboard\\index.tsx" />
      <Route path="tasks" file="routes\\members\\$idNumber\\dashboard\\tasks.tsx" />
      <Route path="teams" file="routes\\members\\$idNumber\\dashboard\\teams.tsx" />
      <Route path="info" file="routes\\members\\$idNumber\\dashboard\\info.tsx" />
      <Route path="add" file="routes\\members\\$idNumber\\dashboard\\add.tsx">
        <Route path="school" file="routes\\members\\$idNumber\\dashboard\\add\\school.tsx" />
      </Route>
    </Route>
    <Route path="actions/filterOrders" file="routes\\actions\\filterOrders.tsx" />
    <Route path="members/:idNumber/me" file="routes\\members\\$idNumber\\me.tsx" />
    <Route path="actions/addSchool" file="routes\\actions\\addSchool.tsx" />
    <Route path="actions/addUser" file="routes\\actions\\addUser.tsx" />
    <Route path="demos/actions" file="routes\\demos\\actions.tsx" />
    <Route path="demos/correct" file="routes\\demos\\correct.tsx" />
    <Route path="demos/params" file="routes\\demos\\params.tsx">
      <Route index file="routes\\demos\\params\\index.tsx" />
      <Route path=":id" file="routes\\demos\\params\\$id.tsx" />
    </Route>
    <Route path="demos/about" file="routes\\demos\\about.tsx">
      <Route index file="routes\\demos\\about\\index.tsx" />
      <Route path="whoa" file="routes\\demos\\about\\whoa.tsx" />
    </Route>
    <Route path="logout" file="routes\\logout.tsx" />
    <Route path="admin" file="routes\\admin.tsx">
      <Route path="orders" file="routes\\admin\\orders.tsx" />
      <Route path="teams" file="routes\\admin\\teams.tsx" />
    </Route>
    <Route index file="routes\\index.tsx" />
    <Route path="login" file="routes\\login.tsx" />
  </Route>
</Routes>
```
