

using AngularWebshop.API.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularWebshop.API.Models
{
    public class ProductDto
    {
        
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public ICollection<Tag>? Tags { get; set; } = new List<Tag>();
        public ICollection<Rating>? Ratings { get; set; } = new List<Rating>();
    }
}
