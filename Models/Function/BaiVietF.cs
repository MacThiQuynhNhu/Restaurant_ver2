using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Restaurant.Models.Function
{
    public class BaiVietF
    {

        private Model1 context;

        public BaiVietF()
        {
            context = new Model1();
        }

        public IQueryable<BaiViet> DSBaiViet
        {
            get { return context.BaiViets; }
        }

        // Trả về một đối tượng danh mục, khi biết Khóa
        public BaiViet FindEntity(string MaBaiViet)
        {
            BaiViet dbEntry = context.BaiViets.Find(MaBaiViet);
            return dbEntry;
        }

        // Thêm một đối tượng
        public bool Insert(BaiViet model)
        {
            BaiViet dbEntry = context.BaiViets.Find(model.MaBaiViet);

            if (dbEntry != null)
            {
                return false;

            }
            context.BaiViets.Add(model);

            context.SaveChanges();

            return true;
        }
    }
}