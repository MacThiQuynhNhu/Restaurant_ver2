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
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public BanDatTruoc()
        {
            DanhSachGoiMonTruocs = new HashSet<DanhSachGoiMonTruoc>();
        }

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

        public bool? TonTai { get; set; }

        public virtual Ban Ban { get; set; }

        public virtual KhachHang KhachHang { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DanhSachGoiMonTruoc> DanhSachGoiMonTruocs { get; set; }
    }
}
