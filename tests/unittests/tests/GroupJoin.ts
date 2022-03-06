import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

// Example adapted form
// https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable.groupjoin?view=net-6.0
type Person = { Name: string }
type Pet = { Name: string, Owner: Person }

const magnus: Person = { Name: "Hedlund, Magnus" };
const terry: Person = { Name: "Adams, Terry" };
const charlotte: Person = { Name: "Weiss, Charlotte" };

const barley: Pet = { Name: "Barley", Owner: terry };
const boots: Pet = { Name: "Boots", Owner: terry };
const whiskers: Pet = { Name: "Whiskers", Owner: charlotte };
const daisy: Pet = { Name: "Daisy", Owner: magnus };

const people = [ magnus, terry, charlotte ];
const pets = [ barley, boots, whiskers, daisy ];

describe("groupJoin", () => {
    itEnumerable<Person>("basic", (asEnumerable) => {
        const query =
            asEnumerable(people).groupJoin(pets,
                    person => person,
                    pet => pet.Owner,
                    (person, petCollection) => {
                        return {
                            OwnerName: person.Name,
                            Pets: petCollection
                                .map(pet => pet.Name)
                        }
                    })
            .toArray();

        expect(query).toEqual([
            { OwnerName: magnus.Name, Pets: [ daisy.Name ] },
            { OwnerName: terry.Name, Pets: [ barley.Name, boots.Name ] },
            { OwnerName: charlotte.Name, Pets: [ whiskers.Name ] }
        ])
    })

    itAsync("basic", async () => {
        const query = await asAsync(people).groupJoin(pets,
                    person => person,
                    pet => pet.Owner,
                    (person, petCollection) => {
                        return {
                            OwnerName: person.Name,
                            Pets: petCollection
                                .map(pet => pet.Name)
                        }
                    })
                    .toArray();

        expect(query).toEqual([
            { OwnerName: magnus.Name, Pets: [ daisy.Name ] },
            { OwnerName: terry.Name, Pets: [ barley.Name, boots.Name ] },
            { OwnerName: charlotte.Name, Pets: [ whiskers.Name ] }
        ])
    })

    itParallel("basic", async () => {
        const query = await asAsync(people).groupJoin(pets,
                    person => person,
                    pet => pet.Owner,
                    (person, petCollection) => {
                        return {
                            OwnerName: person.Name,
                            Pets: petCollection
                                .map(pet => pet.Name)
                        }
                    })
                    .toArray();

        expect(query).toEqual([
            { OwnerName: magnus.Name, Pets: [ daisy.Name ] },
            { OwnerName: terry.Name, Pets: [ barley.Name, boots.Name ] },
            { OwnerName: charlotte.Name, Pets: [ whiskers.Name ] }
        ])
    })

    itParallel("inner async", async () => {
        const asyncPets = asAsync(pets);
        const query = await asAsync(people).groupJoin(asyncPets,
                    person => person,
                    pet => pet.Owner,
                    (person, petCollection) => {
                        return {
                            OwnerName: person.Name,
                            Pets: petCollection
                                .map(pet => pet.Name)
                        }
                    })
                    .toArray();

        expect(query).toEqual([
            { OwnerName: magnus.Name, Pets: [ daisy.Name ] },
            { OwnerName: terry.Name, Pets: [ barley.Name, boots.Name ] },
            { OwnerName: charlotte.Name, Pets: [ whiskers.Name ] }
        ])
    })

    itParallel<Person>("basic", async asParallel => {
        const query = await asParallel(people).groupJoin(pets,
            person => person,
            pet => pet.Owner,
            (person, petCollection) => {
                return {
                    OwnerName: person.Name,
                    Pets: petCollection
                        .map(pet => pet.Name)
                }
            })
            .toArray();

        expect(query).toEqual([
            { OwnerName: magnus.Name, Pets: [ daisy.Name ] },
            { OwnerName: terry.Name, Pets: [ barley.Name, boots.Name ] },
            { OwnerName: charlotte.Name, Pets: [ whiskers.Name ] }
        ])
    })

    itParallel<Person>("basic async", async asParallel => {
        const asyncPets = asAsync(pets);
        const query = await asParallel(people).groupJoin(asyncPets,
            person => person,
            pet => pet.Owner,
            (person, petCollection) => {
                return {
                    OwnerName: person.Name,
                    Pets: petCollection
                        .map(pet => pet.Name)
                }
            })
            .toArray();

        expect(query).toEqual([
            { OwnerName: magnus.Name, Pets: [ daisy.Name ] },
            { OwnerName: terry.Name, Pets: [ barley.Name, boots.Name ] },
            { OwnerName: charlotte.Name, Pets: [ whiskers.Name ] }
        ])
    })
})
