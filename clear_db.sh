#! /bin/bash

# clean the database
clear() {
    find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
    find . -path "*/migrations/*.pyc"  -delete
    rm ~/Documents/code/tryout/SC2006-project/reccoplan/db.sqlite3
}

# makemigrations and migrate
make_migrate() {
    python manage.py makemigrations
    python manage.py migrate
}

# conda activate sc2006
#which python3
cd ~/Documents/code/tryout/SC2006-project/reccoplan/
clear
make_migrate
echo "Success!"