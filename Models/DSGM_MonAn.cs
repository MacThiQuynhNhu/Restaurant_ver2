namespace Restaurant.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class DSGM_MonAn
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DSGM_MonAn()
        {
            GoiToppings = new HashSet<GoiTopping>();
        }

        [Key]
        [Column(Order = 0)]
        [StringLength(10)]
        public string MaGoiMon { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(10)]
        public string MaMonAn { get; set; }

        public int? SoLuong { get; set; }

        public int? TinhTrang { get; set; }

        public string ThoiGian { get; set; }

        public virtual DanhSachGoiMon DanhSachGoiMon { get; set; }

        public virtual MonAn MonAn { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<GoiTopping> GoiToppings { get; set; }
    }
}
