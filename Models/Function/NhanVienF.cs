using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Restaurant.Models;

namespace Restaurant.Models.Function
{
    public class NhanVienF
    {
        private Model1 context;

        public NhanVienF()
        {
            context = new Model1();
            
        }

        public IQueryable<NhanVien> DSNhanVien
        {
            get { return context.NhanViens; }
           
        }

        

        // Thêm một đối tượng
        public bool Insert(NhanVien model)
        {
            NhanVien dbEntry = context.NhanViens.Find(model.MaNhanVien);

            if (dbEntry != null)
            {
                return false;

            }
            context.NhanViens.Add(model);

            context.SaveChanges();

            return true;
        }
    }
}