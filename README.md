# Steps to run backend + frontend in docker container
- Copy `backend/.env.example` to `.env`
- Supplement `.env` file with `APP_SECRET, MAIL_*` variables
- Run containers with: `docker-compose up -d`
- Run migrations with: `docker-compose run app yarn migrate`
- Run seeds with: `docker-compose run app yarn seed`
- Stop containers with: `docker-compose down`

# Steps to run mobile
**Mobile app tested only in android environment**
- Navigate to `mobile` folder
- Copy `.env.example` to `.env`
- If necessary, in `.env` file, change `API_URL` variable
- Run dependency installer with: `yarn`
- Run metro bundler with: `yarn start`
- Install android app with: `yarn android`
