# MeTH

First, checkout to `local` and install dependencies:

```bash
yarn install
```

And then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Test chat with admin
- To test the chat feature, first you must create a superuser on our Django REST api with the following command (run it on the **backend** folder): `docker-compose run --rm api sh -c "python manage.py createsuperuser"`
- Next, sign up to the app, and while on the chat page, open a private tab and log in with the superuser you just created on the following URL: `http://localhost:3000/suport/admin`
- Finally, you can test the chat feature by yourself!
<img src=img/img3.png style='height:350px; width:auto'>
<img src=img/img4.png style='height:350px; width:auto'>


## Deploy URL
- It is required to allow `Insecure content` within the browser, so that requests to the aws deployed Django Rest API are accepted.
<img src=img/img1.png style='height:350px; width:auto'>
<img src=img/img2.png style='height:350px; width:auto'>



- https://meth-app.vercel.app/
