using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using CityPopulation;
using CityPopulation.Controllers;
using CityPopulation.Models;

namespace CityPopulation.Tests.Controllers
{
    [TestClass]
    public class PopulationsControllerTest
    {
        [TestMethod]
        public void Get()
        {
            
        }

        [TestMethod]
        public void GetById(string id)
        {
            //Obj sample: { "city" : "AGAWAM", "loc" : [ -72.622739, 42.070206 ], "pop" : 15338, "state" : "MA", "_id" : "01001" }
            // Arrange
            PopulationsController controller = new PopulationsController();
            // Values
            string zipCode = "01001";
            int popValue = 15338;
            string cityValue = "AGAWAM";
            string stateValue = "MA";
            // Act
            Population p = controller.GetPopulation(zipCode);
            // Assert
            Assert.AreEqual(popValue, p.pop);
            Assert.AreEqual(cityValue, p.city);
            Assert.AreEqual(stateValue, p.state);
        }

        [TestMethod]
        public void Post()
        {
            
        }        
    }
}
