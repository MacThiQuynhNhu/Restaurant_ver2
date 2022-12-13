namespace Restaurant.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DauBep")]
    public partial class DauBep
    {
        [Key]
        [StringLength(10)]
        public string MaDauBep { get; set; }

        [Required]
        [StringLength(50)]
        public string TenDauBep { get; set; }

        public bool? GioiTinh { get; set; }

        [StringLength(20)]
        public string SoDienThoai { get; set; }

        public string DiaChi { get; set; }

        public string HinhAnh { get; set; }

        public string MoTa { get; set; }
    }
}
