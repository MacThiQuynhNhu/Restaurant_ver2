namespace Restaurant.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("BanDatTruoc")]
    public partial class BanDatTruoc
    {
        [Key]
        [StringLength(10)]
        public string MaBanDatTruoc { get; set; }

        [Required]
        [StringLength(10)]
        public string MaKhachHang { get; set; }

        [StringLength(10)]
        public string MaBan { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Ngay { get; set; }

        public TimeSpan? Gio { get; set; }

        public int? SoLuong { get; set; }

        [StringLength(200)]
        public string GhiChu { get; set; }

        [StringLength(10)]
        public string MaNhanVien { get; set; }

        public virtual Ban Ban { get; set; }

        public virtual KhachHang KhachHang { get; set; }
    }
}
