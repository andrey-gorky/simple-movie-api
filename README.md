# WebbyLab Movie API

Current small project is api that allows to create, store, and retreive information about movies.

In addition, there is an option to upload the .txt with movies info to store in database.

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of docker on your machine;
* You have Postman on your machine;
* Clone this repository to your local machine.

## Installing and Running WebbyLab Movie API

To install WebbyLab Movie API, follow these steps:

In the root directory of the project create docker images:
```
docker compose build
```

Run the image:
```
docker compose up
```

In case if image won't run at first time, just try to rerun it :) :
```
docker compose up
```

## Using WebbyLab Movie API

To use WebbyLab Movie API, follow these steps:

* Feel free to import postman collection by the link: [WebbyLab Movie API Postman collection](https://www.getpostman.com/collections/ff992216bae21b20847e);
* To import data from .txt file through simplest gui, you should go to <http://localhost:8000/api/v1/import>. The .txt sample file added to the project, you can find it in './mock' folder;
* Enjoy.


## Contact

If you want to contact me you can reach me at <gorkaviya@gmail.com>.
