namespace Restaurant.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("HoaDon")]
    public partial class HoaDon
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public HoaDon()
        {
            DanhSachGoiMons = new HashSet<DanhSachGoiMon>();
        }

        [Key]
        [StringLength(10)]
        public string MaHoaDon { get; set; }

        public int? SoTien { get; set; }

        public DateTime? ThoiGianXuat { get; set; }

        [StringLength(50)]
        public string TinhTrang { get; set; }

        [StringLength(10)]
        public string MaNhanVien { get; set; }

        [Required]
        [StringLength(10)]
        public string MaGoiMon { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DanhSachGoiMon> DanhSachGoiMons { get; set; }

        public virtual NhanVien NhanVien { get; set; }
    }
}
