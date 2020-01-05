# Steps to run backend + frontend in docker container
**All data will be losted when containers whould be stopped**
- Copy `backend/.env.example` to `.env`
- Supplement `.env` file with `APP_SECRET, MAIL_*` variables
- Run containers with: `docker-compose up -d --build`
- Run migrations with: `docker-compose run app yarn migrate`
- Run seeds with: `docker-compose run app yarn seed`
- Access application via: `http://127.0.0.1:3333`, user: `admin@gympoint.com`, password: `123456`

# Steps to run mobile
**Mobile app tested only in android environment**
- Navigate to `mobile` folder
- Copy `.env.example` to `.env`
- If necessary, in `.env` file, change `API_URL` variable
- Run dependency installer with: `yarn`
- Run metro bundler with: `yarn start`
- Install android app with: `yarn android`

# Stop containers
- Stop containers with: `docker-compose down`
