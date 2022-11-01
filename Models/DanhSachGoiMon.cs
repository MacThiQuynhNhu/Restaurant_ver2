namespace Restaurant.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DanhSachGoiMon")]
    public partial class DanhSachGoiMon
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DanhSachGoiMon()
        {
            DSGM_MonAn = new HashSet<DSGM_MonAn>();
        }

        [Key]
        [StringLength(10)]
        public string MaGoiMon { get; set; }

        public DateTime? ThoiGian { get; set; }

        public bool? TinhTrang { get; set; }

        public string GhiChu { get; set; }

        [StringLength(10)]
        public string MaKhachHang { get; set; }

        [StringLength(10)]
        public string MaDanhGia { get; set; }

        [StringLength(10)]
        public string MaHoaDon { get; set; }

        [StringLength(10)]
        public string MaBan { get; set; }

        [StringLength(10)]
        public string MaNhanVien { get; set; }

        public virtual Ban Ban { get; set; }

        public virtual DanhGia DanhGia { get; set; }

        public virtual HoaDon HoaDon { get; set; }

        public virtual KhachHang KhachHang { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DSGM_MonAn> DSGM_MonAn { get; set; }
    }
}
