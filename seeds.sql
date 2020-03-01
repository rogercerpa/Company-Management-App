USE company_management;

INSERT INTO departments
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance');

INSERT INTO role
    (title, salary)
VALUES
    ('Sales Manager', 50000),
    ('Application Engineer', 60000),
    ('Finance Manager', 70000);

INSERT INTO employee
    (first_name, last_name, role_id)
VALUES
    ('Roger', 'Cerpa', 1),
    ('Eduardo', 'DeCastro', 2),
    ('Jesus', 'Barrios', 3)