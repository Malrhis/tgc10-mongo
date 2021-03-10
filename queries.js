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