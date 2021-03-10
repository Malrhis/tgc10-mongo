// see all the databases
show databases

// we want to use an existing database
use sample_airnb

// see all the collections
show collections

// display ALL documents from a collection
// debugger.<collection>.find()

db.listingsAndReviews.find();

//prettify the output
db.listingsAndReviews.find().pretty()

// projecting
// select which keys to display
db.listingsAndReviews.find({}, {
    name: 1,
    address: 1
}).pretty()

// projecting the key of an embedded document
// What if I only want to see country
db.listingsAndReviews.find({}, {
    name: 1,
    'address.country': 1
}).pretty()

// finding by criteria
// the first object for all the find() is empty. this is the criteria object
db.listingsAndReviews.find({
    beds: 5
}, {
    name: 1,
    beds: 1
}).pretty()

// find by a key in an embedded document
// aka sub document, aka nested object
// find all listings in Brazil
db.listingsAndReviews.find({
    'address.country': 'Brazil'
}, {
    name: 1,
    'address.country': 1
}).pretty()

// multiple criteria
// find listings that have 5 beds and 5 bedrooms
db.listingsAndReviews.find({
    beds: 5,
    bedrooms: 5,
    'address.country': 'Brazil'
}, {
    name: 1,
    beds: 1,
    bedrooms: 1,
    'address.country': 1
}).pretty()

// we want to find listings that have more than 3 beds
db.listingsAndReviews.find({
    beds: {
        '$gt':3
    }
},{
    name:1,
    beds:1
}).pretty()

// we want to find listings that have less than 4 beds
db.listingsAndReviews.find({
    beds: {
        '$lt':4
    }
},{
    name: 1,
    beds: 1
}).pretty()

// we want to find listings that have 4 to 8 beds
db.listingsAndReviews.find({
    beds: {
        '$gte':4,
        '$lte':8
    }
},{
    name: 1,
    beds: 1
})

// combine this with multiple criteria
db.listingsAndReviews.find({
    beds:{
        '$gte':4,
        '$lte':8,
        'address.country': 'Brazil'
    }
},{
    name: 1,
    beds: 1,
    'address.country':1
}).pretty()

// Find all listings that allowed pets
db.listingsAndReviews.find({
    'amenities': 'Pets allowed'
}, {
    'name': 1,
    'amenities': 1
}).pretty();

// Find all listings that have pets allowed
// and pets lived on this property
db.listingsAndReviews.find({
    'amenities': {
        '$all': ['Pets allowed', 'Pets live on this property', 'Dog(s)', 'Cat(s)']
    }
}, {
    'name': 1,
    'amenities': 1
}).pretty();

// Count how many listings that have Dog(s) and Cat(s)
db.listingsAndReviews.find({
    'amenities': {
        '$all': ['Pets allowed', 'Pets live on this property', 'Dog(s)', 'Cat(s)']
    }
}, {
    'name': 1,
    'amenities': 1
}).count();

// find all listings that have
// either dogs or cats listed in
// the list of amenities
db.listingsAndReviews.find({
    'amenities': {
        '$in': ['Dog(s)', 'Cat(s)']
    }
}, {
    'name': 1,
    'amenities': 1
}).pretty()

// select a document by ID
db.listingsAndReviews.find({
    '_id': '10006546'
}).pretty()

// select a document by Object ID
use sample_mflix
db.movies.find({
    "_id": ObjectId('573a1390f29313caabcd4135')
})



// how to find by a substring
// e.g. look for all the listings that have the word "spacious" in the name
// word spacious in name. options i is to make everything small case
use sample_airnb
db.listingsAndReviews.find({
    'name': {
        '$regex':'spacious',
        '$options':'i'
    }
},{
    'name':1
})

// compound criteria
// AND/OR
db.listingsAndReviews.find({
    'name': {
        '$regex':'spacious',
        '$options':'i'
    },
    'address.country':'Brazil'
},{
    'name':1,
    'address.country': 1
})

// OR
// Or has to use an array. cause you need the whole thing to evaluate to "true"
db.listingsAndReviews.find({
    '$or': [
        {
            'address.country':'Brazil'
        },
        {
            'address.country':'Canada'
        }
    ]
},{
    'name':1,
    'address.country':1
}).pretty()

// OR and AND
// we find listings in Brazil 
// 
// listings in Canada that has more than 3 beds
db.listingsAndReviews.find({
    '$or':[
        {
            'address.country':'Brazil'
        },
        {
            'address.country':'Canada',
            'beds': {
                '$gt':3
            }
        }
    ]
},{
    'name':1,
    'address.country':1,
    'beds':1
}).pretty();