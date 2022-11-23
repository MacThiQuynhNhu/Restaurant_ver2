namespace Restaurant.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DanhGia")]
    public partial class DanhGia
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DanhGia()
        {
            DanhSachGoiMons = new HashSet<DanhSachGoiMon>();
        }

        [Key]
        [StringLength(10)]
        public string MaDanhGia { get; set; }

        public string MoTa { get; set; }

        public int? SoSao { get; set; }

        public string BinhLuan { get; set; }

        public DateTime? ThoiGian { get; set; }

        [StringLength(10)]
        public string MaGoiMon { get; set; }

        [StringLength(10)]
        public string MaKhachHang { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DanhSachGoiMon> DanhSachGoiMons { get; set; }
    }
}
