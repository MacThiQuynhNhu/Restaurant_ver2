namespace Restaurant.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class MonAn_KhuyenMai
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(10)]
        public string MaMonAn { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(10)]
        public string MaKhuyenMai { get; set; }

        public string MoTa { get; set; }

        public virtual KhuyenMai KhuyenMai { get; set; }

        public virtual MonAn MonAn { get; set; }
    }
}
