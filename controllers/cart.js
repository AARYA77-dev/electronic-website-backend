const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllCart(request, response) {
  try {
    const cart = await prisma.CartItem.findMany({
      include: {
        product: true, // Include product details
      },
    });
    return response.json(cart);
  } catch (error) {
    return response.status(500).json({ error: "Error fetching cart" });
  }
}

async function getAllCartByUserId(request, response) {
  const { userId } = request.params;
  try {
    // getting all products by userId
    const cart = await prisma.CartItem.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true, // Include product details
      },
    });
    return response.json(cart);
  } catch (error) {
    return response.status(500).json({ error: "Error fetching cart" });
  }
}

async function createCart(request, response) {
  try {
    const { userId, productId, quantity } = request.body;

    existingCartItem = await prisma.CartItem.findFirst({
      where:{
        userId:userId,
        productId:productId
      }
    });
    if(existingCartItem){
      const updateItem = await prisma.CartItem.update({
        where:{
          id:existingCartItem.id,
        },
        data:{
          quantity:existingCartItem.quantity+quantity
        }
      });
      return response.status(201).json(updateItem)
    }
    
    const cart = await prisma.CartItem.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });
    return response.status(201).json(cart);
  } catch (error) {
    console.error("Error creating cart item:", error);
    return response.status(500).json({ error: "Error creating cart item" },error);
  }
}

async function deleteCart(request, response) {
  try {
    const { userId, productId } = request.params;
    
    await prisma.CartItem.deleteMany({
      where: {
        userId: userId,
        productId: productId,
      },
    });
    
    return response.status(204).send();

  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error deleting cart item" });
  }
}

async function getSingleProductFromCart(request, response){
  try {
    const { userId, productId } = request.params;
    
    const cart = await prisma.CartItem.findMany({
      where: {
        userId: userId,
        productId: productId,
      },
    });
    
    return response.status(200).json(cart);

  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error getting cart item" });
  }
}

async function deleteAllCartByUserId(request, response) {
  try {
    const { userId } = request.params;
    
    await prisma.CartItem.deleteMany({
      where: {
        userId: userId,
      },
    });
    
    return response.status(204).send();

  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error deleting cart item" });
  }
}

module.exports = {
  getAllCartByUserId,
  getAllCart,
  createCart,
  deleteCart,
  getSingleProductFromCart
};
