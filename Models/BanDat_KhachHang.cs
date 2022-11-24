using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace Restaurant.Models
{
    [Table("BanDat_KhachHang")]
    public class BanDat_KhachHang
    {
        [Key]
        public int MaBanDat { get; set; }

        public string MaBan { get; set; }
        public string HoTen { get; set; }

        public string SoDienThoai { get; set; }

        public DateTime? Ngay { get; set; }

        public TimeSpan? Gio { get; set; }

        public int? SoLuong { get; set; }

        public string GhiChu { get; set; }

    }
}