USE company_management;

INSERT INTO departments
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Manager', 50000, 1),
    ('Account Manager', 60000, 1),
    ('Application Engineer', 70000, 3),
    ('Application Engineer Manager', 80000, 1),
    ('Lead Application Engineer', 75000, 2),
    ('Account assistance', 40000, 2);

INSERT INTO employee
    (first_name, last_name, role_id)
VALUES
    ('Roger', 'Cerpa', 1),
    ('Eduardo', 'DeCastro', 2),
    ('Jesus', 'Barrios', 3)