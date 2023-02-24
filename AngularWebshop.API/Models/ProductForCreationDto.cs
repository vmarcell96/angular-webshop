using AngularWebshop.API.Entities;
using System.ComponentModel.DataAnnotations;

namespace AngularWebshop.API.Models
{
    public class ProductForCreationDto
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;
        [MaxLength(200)]
        public string? Description { get; set; }
        public ICollection<Tag>? Tags { get; set; } = new List<Tag>();
        public ICollection<Rating>? Ratings { get; set; } = new List<Rating>();
    }
}
