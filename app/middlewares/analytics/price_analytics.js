
const priceAnalyticsModels = require('../../models/analytics/price_search');
const PropertySearch = require('../../models/analytics/property_search');
const PropertyView = require('../../models/analytics/property_view');
const UnavailableSearch = require('../../models/analytics/unvailable_search')
const AnaliticsController = require("../../controllers/Analytics/analyticsSetController")
const AnaliticsGetController = require("../../controllers/Analytics/analyticsGetController")


const Misc =  require('../../helpers/misc');
let statusCode;
let data;


class Analytics_middle {

    //CREATE LOCATION
    static async create_location(req,res,next){
        let search_res = await AnaliticsController.saveLocation(req.body)
        Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);

 }

  //GET LOCATION
  static async get_location(req,res,next){
    let search_res = await AnaliticsGetController.geLocation()

    Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);


}
    // GET PROPERTY VIEWS
    static async get_property_views(req,res,next){
        let search_res = await AnaliticsGetController.getView()
        Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);

 }

   //UNAVAILABLE SEARCH
   static async unavailable_search(req,res,next){
    let search_res = await AnaliticsGetController.getUnavailable()

    Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);

}


    //AVAILABLE SEARCH
    static async propertySearch(req,res,next){
        let search_res = await AnaliticsGetController.propertySearch()
        Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);
    }

    //SEARCH PRICE
    static async priceSearch(req,res,next){
        let search_res = await AnaliticsGetController.priceSearch()
        Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);
    }


      // PROPERTY TYPE SEARCH
    static async get_property_type_search(req,res,next){
        let search_res = await AnaliticsGetController.propertyTypeSearches()
        Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);

    }

















           //SEARCH PROPERTY
       static async  property_search(req,res,next){
            const {name} = req.body;
            let search_res = await AnaliticsController.Search(name)
            AnaliticsController.Save_Search(search_res)
            Misc.appResponse(res,"200",statusCode="success","search completed",data= search_res);
            
        }

          


        //PROPERTY VIEWS
         static async property_views(req,res,next){
            const {_id} = req.body;
            const {name} = req.body;
            let search_res = await AnaliticsController.saveView(_id)
            // AnaliticsController.Save_Search(search_res)
            Misc.appResponse(res,"200",statusCode="success","search completed",data= search_res);

     }


    
}

module.exports = Analytics_middle
