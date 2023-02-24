using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AngularWebshop.API.Entities
{
    public class Rating
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Title { get; set; }
        [MaxLength(200)]
        public string? Description { get; set; }
        [Required]
        public int StarRating { get; set; }
        [ForeignKey("ProductId")]
        public Product? Product { get; set; }
        public int ProductId { get; set; }


        public Rating(string title, int starRating)
        {
            Title = title;
            StarRating = starRating;
        }
    }
}
