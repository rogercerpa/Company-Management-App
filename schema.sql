DROP DATABASE IF EXISTS company_management;
CREATE DATABASE company_management;

use company_management;

CREATE TABLE departments
(
    id INT NOT NULL
    AUTO_INCREMENT,
    name VARCHAR
    (30) NOT NULL,
    
    PRIMARY KEY
    (id)
);

    CREATE TABLE role
    (
        id INT NOT NULL
        AUTO_INCREMENT,
    title VARCHAR
        (30) NOT NULL,
    salary DECIMAL
        (12,4) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY
        (id)
    FOREIGN KEY
        (department_id) REFERENCES departments
        (id)
);

        CREATE TABLE employee
        (
            id INT NOT NULL
            AUTO_INCREMENT,
    first_name VARCHAR
            (30) NOT NULL,
    last_name VARCHAR
            (30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY
            (id)
    FOREIGN KEY
            (role_id) REFERENCES role
            (id)
);
