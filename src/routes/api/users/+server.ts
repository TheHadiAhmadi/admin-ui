import {faker} from '@faker-js/faker'

var response = []
    
    
for(let i=0; i<500; i++) {
    response.push({
        name: faker.person.firstName() + ' ' + faker.person.lastName(),
        username: faker.internet.userName(),
        date_of_birth: faker.date.past({years: 50}),  // Generates a date of birth within the last 30 years
        status: faker.datatype.boolean() ? 'active' : 'disabled',
        created_at: faker.date.past({years: 2}),
        email: faker.internet.email(),
    })
}


export async function GET() {
    return new Response(JSON.stringify(response), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}