using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CityPopulation.Models
{
    public class Population
    {
        public string city { get; set; }
        public List<double> loc { get; set; }
        public int pop { get; set; }
        public string state { get; set; }
        public string _id { get; set; }
    }
}