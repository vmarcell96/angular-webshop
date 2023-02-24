using Microsoft.AspNetCore.Mvc;

namespace AngularWebshop.API.Controllers
{
    public class RatingsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
