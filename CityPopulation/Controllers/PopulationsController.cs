using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using CityPopulation.Models;
using System.Web.Hosting;
using System.IO;
using Newtonsoft.Json;

namespace CityPopulation.Controllers
{
    public class PopulationsController : ApiController
    {
        private static readonly string _appDataPath = HostingEnvironment.MapPath("~/App_Data/zips.json");

        // GET: api/Populations
        public List<Population> Get()
        {
            List<Population> populations;

            using (StreamReader r = new StreamReader(_appDataPath))
            {
                string json = r.ReadToEnd();
                populations = JsonConvert.DeserializeObject<List<Population>>(json);
            }

            return populations.OrderBy(p=>p.city).ToList();
        }


        // GET: api/Populations/01001
        [HttpGet]
        [ResponseType(typeof(Population))]
        public Population GetPopulation(string id)
        {
            Population population = Get().FirstOrDefault(p => p._id == id);
            if (population == null)
            {
                return null;
            }
            return population;
        }

        // POST: api/Populations
        [ResponseType(typeof(Population))]
        [HttpPost]
        public IHttpActionResult Post(Population population)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<Population> populations = Get();
            var itemIndex = populations.FindIndex(p => p._id == population._id);
            populations.RemoveAt(itemIndex);
            populations.Add(population);

            string newPopulations = JsonConvert.SerializeObject(populations);
            File.WriteAllText(_appDataPath, newPopulations);

            return CreatedAtRoute("DefaultApi", new { _id = population._id }, population);
        }

        // GET: api/Populations
        [HttpGet]
        public List<Population> SearchCity(int count, string filter)
        {
            if(count>0)
            {
                if (filter == null)
                    return Get().Take(count).ToList();
                else
                    return Get().FindAll(f => f.city.ToLower().Contains(filter.ToLower())).Take(count).ToList();
            }
            else
            {
                if (filter == null)
                    return Get();
                else
                    return Get().FindAll(f => f.city.ToLower().Contains(filter.ToLower()));
            }            
        }
    }
}