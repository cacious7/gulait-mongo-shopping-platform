const router = require( 'express' ).Router();
const Category = require( "../models/Category" );

/**
 * Get the available list of categories
 * Does not require validation
 * @param { Object } req the request from the user
 * @param { Object } res A response object used to respond to the user interface
 */
router.get( '/list', async ( req, res ) => {
    const categories = await Category.findOne( {} );
    if( categories ){
        return res.status( 200 ).json( { message: 'Success', data: categories } );
    } else {
        return res.status( 500 ).json( { message: 'Error', data: 'No categories where found. Please contact admin.' } );
    }
} );

//load categories
router.post( '/load', async ( req, res) => {
    try {
        const category  = new Category( {
            Products: {
                new: {
                    Sports_and_Outdoors: {
                        Sports_and_Outdoors: true,
                        Outdoor_Recreation: true,
                        Sports_and_Fitness: true
                    },
                    Baby: {
                        Activity_and_Entertainment: true,
                        Apparel_and_Accessories: true,
                        Baby_and_Toddler_Toys: true,
                        Baby_Care: true,
                        Baby_Stationery: true,
                        Car_Seats_and_Accessories: true,
                        Diapering: true,
                        Feeding: true,
                        Gifts: true,
                        Nursery: true,
                        Potty_Training: true,
                        Pregnancy_and_Maternity: true,
                        Safety: true,
                        Strollers_and_Accessories: true,
                        Travel_Gear: true
                    },
                    Automotive: {
                        Car_Care: true,
                        Car_Electronics_and_Accessories: true,
                        Exterior_Accessories: true,
                        Interior_Accessories: true,
                        Lights_and_Lighting_Accessories: true,
                        Motorcycle_and_Powersports: true,
                        Oils_and_Fluids: true,
                        Paint_and_Paint_Supplies: true,
                        Performance_Parts_and_Accessories: true,
                        Replacement_Parts: true,
                        RV_Parts_and_Accessories: true,
                        Tires_and_Wheels: true,
                        Tools_and_Equipment: true,
                        Automotive_Enthusiast_Merchandise: true,
                        Heavy_Duty_and_Commercial_Vehicle_Equipment: true
                    },
                    Arts_and_Crafts: {
                        Painting_comma__Drawing_and_Art_Supplies: true,
                        Beading_and_Jewelry_Making: true,
                        Crafting: true,
                        Fabric: true,
                        Fabric_Decorating: true,
                        Knitting_and_Crochet: true,
                        Needlework: true,
                        Organization_comma__Storage_and_Transport: true,
                        Printmaking: true,
                        Scrapbooking_and_Stamping: true,
                        Sewing: true,
                        Party_Decorations_and_Supplies: true,
                        Gift_Wrapping_Supplies: true
                    },
                    Beauty_and_Personal_Care: {
                        Makeup: true,
                        Skin_Care: true,
                        Hair_Care: true,
                        Fragrance: true,
                        Foot_comma__Hand_and_Nail_Care: true,
                        Tools_and_Accessories: true,
                        Shave_and_Hair_Removal: true,
                        Personal_Care: true,
                        Oral_Care: true
                    },
                    Computers: {
                        Computer_Accessories_and_Peripherals: true,
                        Computer_Components: true,
                        Computers_and_Tablets: true,
                        Data_Storage: true,
                        External_Components: true,
                        Laptop_Accessories: true,
                        Monitors: true,
                        Networking_Products: true,
                        Power_Strips_and_Surge_Protectors: true,
                        Printers: true,
                        Scanners: true,
                        Servers: true,
                        Tablet_Accessories: true,
                        Tablet_Replacement_Parts: true,
                        Warranties_and_Services: true
                    },
                    Electronics: {
                        Accessories_and_Supplies: true,
                        Camera_and_Photo: true,
                        Car_and_Vehicle_Electronics: true,
                        Cell_Phones_and_Accessories: true,
                        Computers_and_Accessories: true,
                        GPS_and_Navigation: true,
                        Headphones: true,
                        Home_Audio: true,
                        Office_Electronics: true,
                        Portable_Audio_and_Video: true,
                        Security_and_Surveillance: true,
                        Service_Plans: true,
                        Television_and_Video: true,
                        Video_Game_Consoles_and_Accessories: true,
                        Video_Projectors: true,
                        Wearable_Technology: true,
                        eBook_Readers_and_Accessories: true
                    },
                    Women_apostrophe_s_Fashon: {
                        Clothing: true,
                        Shoes: true,
                        Jewelry: true,
                        Watches: true,
                        Handbags: true,
                        Accessories: true
                    },
                    Men_apostrophe_s_Fashion: {
                        Clothing: true,
                        Shoes: true,
                        Watches: true,
                        Accessories: true
                    },
                    Girls_apostrophe_Fashion: {
                        Clothing: true,
                        Shoes: true,
                        Jewelry: true,
                        Watches: true,
                        Accessories: true,
                        School_Uniforms: true
                    },
                    Boys_apostrophe_Fashion: {
                        Clothing: true,
                        Shoes: true,
                        Jewelry: true,
                        Watches: true,
                        Accessories: true,
                        School_Uniforms: true
                    },
                    Health_and_HouseHold: {
                        Baby_and_Child_Care: true,
                        Health_Care: true,
                        Household_Supplies: true,
                        Medical_Supplies_and_Equipment: true,
                        Oral_Care: true,
                        Personal_Care: true,
                        Sexual_Wellness: true,
                        Sports_Nutrition: true,
                        Stationery_and_Gift_Wrapping_Supplies: true,
                        Vision_Care: true,
                        Vitamins_and_Dietary_Supplements: true,
                        Wellness_and_Relaxation: true
                    },
                    Home_and_Kitchen: {
                        Kids_apostrophe_Home_Store: true,
                        Kitchen_and_Dining: true,
                        Bedding: true,
                        Bath: true,
                        Furniture: true,
                        Home_Decor: true,
                        Wall_Art: true,
                        Lighting_and_Ceiling_Fans: true,
                        Seasonal_Decor: true,
                        Event_and_Party_Supplies: true,
                        Heating_comma___Cooling_and_Air_Quality: true,
                        Irons_and_Steamers: true,
                        Vacuums_and_Floor_Care: true,
                        Storage_and_Organization: true,
                        Cleaning_Supplies: true
                    },
                    Industrial_and_Scientific: {
                        Abrasive_and_Finishing_Products: true,
                        Additive_Manufacturing_Products: true,
                        Commercial_Door_Products: true,
                        Cutting_Tools: true,
                        Fasteners: true,
                        Filtration: true,
                        Food_Service_Equipment_and_Supplies: true,
                        Hydraulics_comma__Pneumatics_and_Plumbing: true,
                        Industrial_Electrical: true,
                        Industrial_Hardware: true,
                        Industrial_Power_and_Hand_Tools: true,
                        Janitorial_and_Sanitation_Supplies: true,
                        Lab_and_Scientific_Products: true,
                        Material_Handling_Products: true,
                        Occupational_Health_and_Safety_Products: true,
                        Packaging_and_Shipping_Supplies: true,
                        Power_Transmission_Products: true,
                        Professional_Dental_Supplies: true,
                        Professional_Medical_Supplies: true,
                        Raw_Materials: true,
                        Retail_Store_Fixtures_and_Equipment: true,
                        Robotics: true,
                        Science_Education: true,
                        Tapes_comma__Adhesives_and_Sealants: true,
                        Test_comma__Measure_and_Inspect: true
                    },
                    Luggage: {
                        Carry_hyphen_ons: true,
                        Backpacks: true,
                        Garment_bags: true,
                        Travel_Totes: true,
                        Luggage_Sets: true,
                        Laptop_Bags: true,
                        Suitcases: true,
                        Kids_Luggage: true,
                        Messenger_Bags: true,
                        Umbrellas: true,
                        Duffles: true,
                        Travel_Accessories: true
                    },
                    Software: {
                        Accounting_and_Finance: true,
                        Antivirus_and_Security: true,
                        Business_and_Office: true,
                        Children_apostrophe_s: true,
                        Design_and_Illustration: true,
                        Digital_Software: true,
                        Education_and_Reference: true,
                        Games: true,
                        Lifestyle_and_Hobbies: true,
                        Music: true,
                        Networking_and_Servers: true,
                        Operating_Systems: true,
                        Photography: true,
                        Programming_and_Web_Development: true,
                        Tax_Preparation: true,
                        Utilities: true,
                        Video: true
                    },
                    Tools_and_Home_Improvements: {
                        Tools_and_Home_Improvements: true,
                        Appliances: true,
                        Building_Supplies: true,
                        Electrical: true,
                        Hardware: true,
                        Kitchen_and_Bath_Fixtures: true,
                        Light_Bulbs: true,
                        Lighting_and_Ceiling_Fans: true,
                        Measuring_and_Layout_Tools: true,
                        Painting_Supplies_and_Wall_Treatments: true,
                        Power_and_Hand_Tools: true,
                        Rough_Plumbing: true,
                        Safety_and_Security: true,
                        Storage_and_Home_Organization: true,
                        Welding_and_Soldering: true
                    },
                    Toys_and_Games: {
                        Action_Figures_and_Statues: true,
                        Arts_and_Crafts: true,
                        Baby_and_Toddler_Toys: true,
                        Building_Toys: true,
                        Dolls_and_Accessories: true,
                        Dress_Up_and_Pretend_Play: true,
                        Kids_apostrophe_Electronics: true,
                        Games: true,
                        Grown_hyphen_Up_Toys: true,
                        Hobbies: true,
                        Kids_apostrophe_Furniture_comma__Decor_and_Storage: true,
                        Learning_and_Education: true,
                        Novelty_and_Gag_Toys: true,
                        Party_Supplies: true,
                        Puppets: true,
                        Puzzles: true,
                        Sports_and_Outdoor_Play: true,
                        Stuffed_Animals_and_Plush_Toys: true,
                        Toy_Remote_Control_and_Play_Vehicles: true,
                        Tricycles_comma__Scooters_and_Wagons: true,
                        Video_Games: true
                    },
                    Video_Games: {
                        Video_Games: true,
                        PlayStation_4: true,
                        PlayStation_3: true,
                        Xbox_One: true,
                        Xbox_360: true,
                        Nintendo_Switch: true,
                        Wii_U: true,
                        Wii: true,
                        PC: true,
                        Mac: true,
                        Nintendo_3DS_and_2DS: true,
                        Nintendo_DS: true,
                        PlayStation_Vita: true,
                        Sony_PSP: true,
                        Retro_Gaming_and_Microconsoles: true,
                        Accessories: true,
                        Digital_Games: true,
                        Kids_and_Family: true,
                    },
                    Pet_Supplies: {
                        Dogs: true,
                        Cats: true,
                        Fish_and_Aquatic_Pets: true,
                        Birds: true,
                        Horses: true,
                        Reptiles_and_Amphibians: true,
                        Small_Animals: true
                    },
                    Pets: {
                        Dogs: true,
                        Cats: true,
                        Fish_and_Aquatic_Pets: true,
                        Birds: true,
                        Horses: true,
                        Reptiles_and_Amphibians: true,
                        Small_Animals: true
                    }
                },
                used: {
                    Sports_and_Outdoors: {
                        Sports_and_Outdoors: true,
                        Outdoor_Recreation: true,
                        Sports_and_Fitness: true
                    },
                    Baby: {
                        Activity_and_Entertainment: true,
                        Apparel_and_Accessories: true,
                        Baby_and_Toddler_Toys: true,
                        Baby_Stationery: true,
                        Car_Seats_and_Accessories: true,
                        Potty_Training: true,
                        Safety: true,
                        Strollers_and_Accessories: true,
                        Travel_Gear: true
                    },
                    Automotive: {
                        Car_Care: true,
                        Car_Electronics_and_Accessories: true,
                        Exterior_Accessories: true,
                        Interior_Accessories: true,
                        Oils_and_Fluids: true,
                        Paint_and_Paint_Supplies: true,
                        Performance_Parts_and_Accessories: true,
                        Replacement_Parts: true,
                        RV_Parts_and_Accessories: true,
                        Tires_and_Wheels: true,
                        Tools_and_Equipment: true,
                        Automotive_Enthusiast_Merchandise: true,
                        Heavy_Duty_and_Commercial_Vehicle_Equipment: true
                    },
                    Arts_and_Crafts: {
                        Painting_comma__Drawing_and_Art_Supplies: true,
                        Beading_and_Jewelry_Making: true,
                        Crafting: true,
                        Fabric: true,
                        Fabric_Decorating: true,
                        Knitting_and_Crochet: true,
                        Needlework: true,
                        Organization_comma__Storage_and_Transport: true,
                        Printmaking: true,
                        Scrapbooking_and_Stamping: true,
                        Sewing: true,
                        Party_Decorations_and_Supplies: true,
                        Gift_Wrapping_Supplies: true
                    },
                    Computers: {
                        Computer_Accessories_and_Peripherals: true,
                        Computer_Components: true,
                        Computers_and_Tablets: true,
                        Data_Storage: true,
                        External_Components: true,
                        Laptop_Accessories: true,
                        Monitors: true,
                        Networking_Products: true,
                        Power_Strips_and_Surge_Protectors: true,
                        Printers: true,
                        Scanners: true,
                        Servers: true,
                        Tablet_Accessories: true,
                        Tablet_Replacement_Parts: true,
                        Warranties_and_Services: true
                    },
                    Electronics: {
                        Accessories_and_Supplies: true,
                        Camera_and_Photo: true,
                        Car_and_Vehicle_Electronics: true,
                        Cell_Phones_and_Accessories: true,
                        Computers_and_Accessories: true,
                        GPS_and_Navigation: true,
                        Headphones: true,
                        Home_Audio: true,
                        Office_Electronics: true,
                        Portable_Audio_and_Video: true,
                        Security_and_Surveillance: true,
                        Service_Plans: true,
                        Television_and_Video: true,
                        Video_Game_Consoles_and_Accessories: true,
                        Video_Projectors: true,
                        Wearable_Technology: true,
                        eBook_Readers_and_Accessories: true
                    },
                    Women_apostrophe_s_Fashon: {
                        Clothing: true,
                        Shoes: true,
                        Jewelry: true,
                        Watches: true,
                        Handbags: true,
                        Accessories: true
                    },
                    Men_apostrophe_s_Fashion: {
                        Clothing: true,
                        Shoes: true,
                        Watches: true,
                        Accessories: true
                    },
                    Girls_apostrophe_Fashion: {
                        Clothing: true,
                        Shoes: true,
                        Jewelry: true,
                        Watches: true,
                        Accessories: true,
                        School_Uniforms: true
                    },
                    Boys_apostrophe_Fashion: {
                        Clothing: true,
                        Shoes: true,
                        Jewelry: true,
                        Watches: true,
                        Accessories: true,
                        School_Uniforms: true
                    },
                    Health_and_HouseHold: {
                        Household_Supplies: true,
                        Sports_Nutrition: true,
                        Stationery_and_Gift_Wrapping_Supplies: true,
                        Vitamins_and_Dietary_Supplements: true,
                        Wellness_and_Relaxation: true
                    },
                    Home_and_Kitchen: {
                        Kids_apostrophe_Home_Store: true,
                        Kitchen_and_Dining: true,
                        Bedding: true,
                        Bath: true,
                        Furniture: true,
                        Home_Decor: true,
                        Wall_Art: true,
                        Lighting_and_Ceiling_Fans: true,
                        Seasonal_Decor: true,
                        Event_and_Party_Supplies: true,
                        Heating_comma___Cooling_and_Air_Quality: true,
                        Irons_and_Steamers: true,
                        Vacuums_and_Floor_Care: true,
                        Storage_and_Organization: true
                    },
                    Industrial_and_Scientific: {
                        Abrasive_and_Finishing_Products: true,
                        Additive_Manufacturing_Products: true,
                        Commercial_Door_Products: true,
                        Cutting_Tools: true,
                        Fasteners: true,
                        Filtration: true,
                        Food_Service_Equipment_and_Supplies: true,
                        Hydraulics_comma__Pneumatics_and_Plumbing: true,
                        Industrial_Electrical: true,
                        Industrial_Hardware: true,
                        Industrial_Power_and_Hand_Tools: true,
                        Janitorial_and_Sanitation_Supplies: true,
                        Lab_and_Scientific_Products: true,
                        Material_Handling_Products: true,
                        Occupational_Health_and_Safety_Products: true,
                        Packaging_and_Shipping_Supplies: true,
                        Power_Transmission_Products: true,
                        Professional_Dental_Supplies: true,
                        Professional_Medical_Supplies: true,
                        Raw_Materials: true,
                        Retail_Store_Fixtures_and_Equipment: true,
                        Robotics: true,
                        Science_Education: true,
                        Tapes_comma__Adhesives_and_Sealants: true,
                        Test_comma__Measure_and_Inspect: true
                    },
                    Luggage: {
                        Carry_hyphen_ons: true,
                        Backpacks: true,
                        Garment_bags: true,
                        Travel_Totes: true,
                        Luggage_Sets: true,
                        Laptop_Bags: true,
                        Suitcases: true,
                        Kids_Luggage: true,
                        Messenger_Bags: true,
                        Umbrellas: true,
                        Duffles: true,
                        Travel_Accessories: true
                    },
                    Tools_and_Home_Improvements: {
                        Tools_and_Home_Improvements: true,
                        Appliances: true,
                        Building_Supplies: true,
                        Electrical: true,
                        Hardware: true,
                        Kitchen_and_Bath_Fixtures: true,
                        Light_Bulbs: true,
                        Lighting_and_Ceiling_Fans: true,
                        Measuring_and_Layout_Tools: true,
                        Painting_Supplies_and_Wall_Treatments: true,
                        Power_and_Hand_Tools: true,
                        Rough_Plumbing: true,
                        Safety_and_Security: true,
                        Storage_and_Home_Organization: true,
                        Welding_and_Soldering: true
                    },
                    Toys_and_Games: {
                        Action_Figures_and_Statues: true,
                        Arts_and_Crafts: true,
                        Baby_and_Toddler_Toys: true,
                        Building_Toys: true,
                        Dolls_and_Accessories: true,
                        Dress_Up_and_Pretend_Play: true,
                        Kids_apostrophe_Electronics: true,
                        Games: true,
                        Grown_hyphen_Up_Toys: true,
                        Hobbies: true,
                        Kids_apostrophe_Furniture_comma__Decor_and_Storage: true,
                        Learning_and_Education: true,
                        Novelty_and_Gag_Toys: true,
                        Party_Supplies: true,
                        Puppets: true,
                        Puzzles: true,
                        Sports_and_Outdoor_Play: true,
                        Stuffed_Animals_and_Plush_Toys: true,
                        Toy_Remote_Control_and_Play_Vehicles: true,
                        Tricycles_comma__Scooters_and_Wagons: true,
                        Video_Games: true
                    },
                    Video_Games: {
                        Video_Games: true,
                        PlayStation_4: true,
                        PlayStation_3: true,
                        Xbox_One: true,
                        Xbox_360: true,
                        Nintendo_Switch: true,
                        Wii_U: true,
                        Wii: true,
                        PC: true,
                        Mac: true,
                        Nintendo_3DS_and_2DS: true,
                        Nintendo_DS: true,
                        PlayStation_Vita: true,
                        Sony_PSP: true,
                        Retro_Gaming_and_Microconsoles: true,
                        Accessories: true,
                        Digital_Games: true,
                        Kids_and_Family: true,
                    },
                    Pet_Supplies: {
                        Dogs: true,
                        Cats: true,
                        Fish_and_Aquatic_Pets: true,
                        Birds: true,
                        Horses: true,
                        Reptiles_and_Amphibians: true,
                        Small_Animals: true
                    },
                }
            }
        } );
        
        console.log( 'here' );

        const savedCategories = await category.save();
        
        console.log("saved categories: ");
        console.log( savedCategories );

        res.status( 200 ).json( { message: 'Success', data: savedCategories } );
    } catch ( err ) {
        console.log( 'here2' );
        console.log( err.toString() );
        res.status( 200 ).json( { message: 'Error', data: err.toString() } );
    }
} );

module.exports = router;