import Myth from "../models/Myth.js";

export async function create(mythData, userId) {
  // Validate required fields
  const { name, origin, role, image, symbol, era, description } = mythData;

  if (!name || name.trim() === "") {
    throw new Error("Name is required");
  }
  if (!origin || origin.trim() === "") {
    throw new Error("Origin is required");
  }
  if (!role || role.trim() === "") {
    throw new Error("Role is required");
  }
  if (!image || image.trim() === "") {
    throw new Error("Image is required");
  }
  if (!symbol || symbol.trim() === "") {
    throw new Error("Symbol is required");
  }
  if (!era || era.trim() === "") {
    throw new Error("Era is required");
  }
  if (!description || description.trim() === "") {
    throw new Error("Description is required");
  }

  return Myth.create({ ...mythData, owner: userId });
}

export async function getLatestMyths() {
  return Myth.find().sort({ _id: -1 }).limit(3).lean();
}

export async function getAllMyths() {
  return Myth.find().lean();
}

export async function getAllMythsWithOwners() {
  return Myth.find().populate("owner").lean();
}

export async function getMythById(mythId) {
  return Myth.findById(mythId).lean();
}

export async function toggleLike(mythId, userId) {
  const myth = await Myth.findById(mythId);

  if (!myth) {
    throw new Error("Myth not found");
  }

  const likedIndex = myth.likedList.findIndex(
    (likedUserId) => likedUserId.toString() === userId.toString()
  );

  if (likedIndex === -1) {
    // Add like
    myth.likedList.push(userId);
  } else {
    // Remove like
    myth.likedList.splice(likedIndex, 1);
  }

  await myth.save();
  return myth;
}

export async function updateMyth(mythId, mythData) {
  // Validate required fields
  const { name, origin, role, image, symbol, era, description } = mythData;

  if (!name || name.trim() === "") {
    throw new Error("Name is required");
  }
  if (!origin || origin.trim() === "") {
    throw new Error("Origin is required");
  }
  if (!role || role.trim() === "") {
    throw new Error("Role is required");
  }
  if (!image || image.trim() === "") {
    throw new Error("Image is required");
  }
  if (!symbol || symbol.trim() === "") {
    throw new Error("Symbol is required");
  }
  if (!era || era.trim() === "") {
    throw new Error("Era is required");
  }
  if (!description || description.trim() === "") {
    throw new Error("Description is required");
  }

  return Myth.findByIdAndUpdate(mythId, mythData, { new: true });
}

export async function deleteMyth(mythId) {
  return Myth.findByIdAndDelete(mythId);
}
