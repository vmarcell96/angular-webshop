using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AngularWebshop.API.Entities
{
    public class Tag
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(30)]
        public string Name { get; set; }

        [ForeignKey("ProductId")]
        public Product? Product { get; set; }
        public int ProductId { get; set; }

        public Tag(string name)
        {
            Name = name;
        }
    }
}
