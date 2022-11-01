namespace Restaurant.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("GoiTopping")]
    public partial class GoiTopping
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(10)]
        public string MaGoiMon { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(10)]
        public string MaMonAn { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(10)]
        public string MaTopping { get; set; }

        public int? Gia { get; set; }

        public virtual DSGM_MonAn DSGM_MonAn { get; set; }

        public virtual Topping Topping { get; set; }
    }
}
