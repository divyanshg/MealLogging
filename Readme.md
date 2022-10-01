npm install
npm run dev

POST http://localhost:2190/api/user/register
{
    "email": "test",
    "password": "test"
}

POST http://localhost:2190/api/user/login
{
    "email": "test",
    "password": "test"
}

returns a token

GET http://localhost:2190/api/v1/meal/all
Authorization: Bearer <token>
returns all meals

GET http://localhost:2190/api/v1/meal/:id
Authorization: Bearer <token>
returns a meal

POST http://localhost:2190/api/v1/meal
Authorization: Bearer <token>
{
    "foodItems": [
        {
            "name": "Kadhai Paneer"
        },
        {
            "name": "Butter Naan"
        }
    ],
    "hashTags": [
        "#dinner"
    ]
}

returns the created meal

GET http://localhost:2190/api/v1/hashTags
returns all hashTags

GET http://localhost:2190/api/v1/foodItems
returns all foodItems

POST http://localhost:2190/api/v1/foodItems
[
    {
        "name": "Butter Naan"
    },
    {
        "name": "Kadhai Paneer"
    },
    {
        "name": "Aloo Paramtha"
    }
]

returns the created foodItems
