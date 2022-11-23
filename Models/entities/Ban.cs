namespace Restaurant.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Ban")]
    public partial class Ban
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Ban()
        {
            BanDatTruocs = new HashSet<BanDatTruoc>();
            DanhSachGoiMons = new HashSet<DanhSachGoiMon>();
        }

        [Key]
        [StringLength(10)]
        public string MaBan { get; set; }

        [StringLength(50)]
        public string TenBan { get; set; }

        [StringLength(50)]
        public string TrangThai { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BanDatTruoc> BanDatTruocs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DanhSachGoiMon> DanhSachGoiMons { get; set; }
    }
}
