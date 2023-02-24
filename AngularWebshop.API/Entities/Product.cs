using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AngularWebshop.API.Entities
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(200)]
        public string? Description { get; set; }
        public ICollection<Tag>? Tags { get; set; } = new List<Tag>();
        public ICollection<Rating>? Ratings { get; set; } = new List<Rating>();

        public Product(string name)
        {
            Name = name;
        }
    }
}
