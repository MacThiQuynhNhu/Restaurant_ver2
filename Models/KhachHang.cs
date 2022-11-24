namespace Restaurant.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("KhachHang")]
    public partial class KhachHang
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public KhachHang()
        {
            BanDatTruocs = new HashSet<BanDatTruoc>();
            DanhSachGoiMons = new HashSet<DanhSachGoiMon>();
        }

        [Key]
        [StringLength(10)]
        public string MaKhachHang { get; set; }

        [StringLength(50)]
        public string TenKhachHang { get; set; }

        [StringLength(15)]
        public string SDT { get; set; }

        public int? SoLanDatBan { get; set; }

        public int? SoLanGoiMon { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BanDatTruoc> BanDatTruocs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DanhSachGoiMon> DanhSachGoiMons { get; set; }
    }
}
