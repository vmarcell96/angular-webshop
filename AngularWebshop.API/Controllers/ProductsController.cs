using AngularWebshop.API.Models;
using AngularWebshop.API.Services;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace AngularWebshop.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ILogger<ProductsController> _logger;
        private readonly IMailService _mailService;

        public ProductsController(ILogger<ProductsController> logger, IMailService mailService)
        {
            // with the asp.net dependency injection container this null check is not necessary
            // but we use a third party container it can be useful
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mailService = mailService ?? throw new ArgumentNullException(nameof(mailService));
        }

        [HttpGet(Name = "GetProducts")]
        public ActionResult<IEnumerable<ProductDto>> GetProducts()
        {
            _mailService.Send(
                "Listed products",
                "Products are listed."
            );
            return new JsonResult(new List<object> {
               new { id=1, Name="Product1" },
               new { id=2, Name="Product2" },
            });
        }

        [HttpGet("{productId}", Name = "GetProduct")]
        public ActionResult<IEnumerable<ProductDto>> GetProduct(int productId)
        {
            try
            {
                return new JsonResult(new List<object> {
                    new { id=1, Name="Product1" },
                });
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Error while getting product with id={productId}.", ex);
                return StatusCode(500, "A problem happened while handling your request.");
            }
            
        }

        [HttpPost]
        public ActionResult<ProductDto> CreateProduct(
            [FromBody] ProductForCreationDto product)
        {
            var finalProduct = new ProductDto()
            {
                Id = 5,
                Name = product.Name,
                Description = product.Description
            };
            return CreatedAtRoute("GetProduct", finalProduct);
        }

        [HttpPatch("{productId}")]
        public ActionResult<ProductDto> PartiallyUpdateProduct(
            int productId,
            JsonPatchDocument<ProductForUpdateDto> patchDocument)
        {
            return NoContent();
        }
    }
}
