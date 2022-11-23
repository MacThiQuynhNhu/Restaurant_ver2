namespace Restaurant.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Topping")]
    public partial class Topping
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Topping()
        {
            GoiToppings = new HashSet<GoiTopping>();
        }

        [Key]
        [StringLength(10)]
        public string MaTopping { get; set; }

        public string TenTopping { get; set; }

        public int? Gia { get; set; }

        [StringLength(10)]
        public string MaMonAn { get; set; }

        [StringLength(10)]
        public string MaLoaiTopping { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<GoiTopping> GoiToppings { get; set; }

        public virtual LoaiTopping LoaiTopping { get; set; }

        public virtual MonAn MonAn { get; set; }
    }
}
