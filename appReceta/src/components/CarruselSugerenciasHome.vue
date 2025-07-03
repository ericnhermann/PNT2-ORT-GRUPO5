<script setup>
import { ref, onMounted } from 'vue'
import { getAllRecetas } from '../service/api.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { useRouter } from 'vue-router'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const router = useRouter()
const recetas = ref([])
const isLoading = ref(true)
const error = ref(null)

const cargarRecetas = async () => {
    try {
        isLoading.value = true
        const data = await getAllRecetas()
        recetas.value = data
    } catch (err) {
        console.error("Error al cargar las recetas:", err)
        error.value = "Error al cargar las recetas"
    } finally {
        isLoading.value = false
    }
}

function irADetalle(id) {
    router.push({ name: 'RecetaDetalleView', params: { id: id.toString() } })
}

onMounted(() => {
    cargarRecetas()
})
</script>

<template>
    <section class="carrusel-section">
        <div class="section-header">
            <h2 class="section-title">Sugerencias para ti</h2>
            <p class="section-subtitle">Descubre las recetas más populares de nuestra comunidad</p>
        </div>

        <div v-if="isLoading" class="loading-container">
            <div class="loading-spinner"></div>
            <p class="loading-text">Cargando recetas...</p>
        </div>

        <div v-else-if="error" class="error-container">
            <div class="error-icon">⚠️</div>
            <p class="error-text">{{ error }}</p>
            <button @click="cargarRecetas" class="retry-button">Reintentar</button>
        </div>

        <div v-else-if="recetas.length > 0" class="carousel-container">
            <Swiper :modules="[Autoplay, Navigation, Pagination]" loop freeMode grabCursor :autoplay="{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            }" :speed="1000" :space-between="20" :navigation="true" :pagination="{ clickable: true }" :breakpoints="{
                0: {
                    slidesPerView: 1.1,
                    spaceBetween: 10
                },
                360: {
                    slidesPerView: 1.2,
                    spaceBetween: 12
                },
                480: {
                    slidesPerView: 1.4,
                    spaceBetween: 15
                },
                640: {
                    slidesPerView: 2.1,
                    spaceBetween: 18
                },
                768: {
                    slidesPerView: 2.3,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3.1,
                    spaceBetween: 25
                },
                1200: {
                    slidesPerView: 3.5,
                    spaceBetween: 30
                }
            }" class="recipes-swiper">
                <SwiperSlide v-for="receta in recetas" :key="receta.id">
                    <div class="receta-slide" @click="irADetalle(receta.id)">
                        <div class="slide-image-container">
                            <img :src="receta.enlaceImagen || '/placeholder.svg?height=200&width=300'"
                                :alt="`Imagen de ${receta.nombreReceta}`" class="slide-image" loading="lazy" />
                            <div class="slide-overlay">
                                <span class="view-recipe">Ver Receta</span>
                            </div>
                        </div>
                        <div class="slide-content">
                            <h4 class="slide-title">{{ receta.nombreReceta }}</h4>
                            <div class="slide-meta">
                                <span class="slide-category">{{ receta.categoria || 'Sin categoría' }}</span>
                                <div class="slide-rating" v-if="receta.puntajeReceta">
                                    <span class="star">★</span>
                                    <span class="rating-value">{{ receta.puntajeReceta }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>

        <div v-else class="empty-container">
            <div class="empty-icon">🍽️</div>
            <p class="empty-text">No hay recetas disponibles en este momento</p>
        </div>
    </section>
</template>

<style scoped>
.carrusel-section {
    padding: 2rem 0;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
}

.section-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 0 1rem;
    box-sizing: border-box;
}

.section-title {
    color: #4CAF50;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    line-height: 1.2;
    margin-top: 0;
}

.section-subtitle {
    color: #666;
    font-size: 1rem;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
}

.loading-container {
    text-align: center;
    padding: 3rem 1rem;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f4f6;
    border-top: 3px solid #4CAF50;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

.loading-text {
    color: #666;
    font-size: 1rem;
}

.error-container {
    text-align: center;
    padding: 3rem 1rem;
}

.error-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.error-text {
    color: #dc2626;
    font-size: 1rem;
    margin-bottom: 1.5rem;
}

.retry-button {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 0.7rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 0.9rem;
}

.retry-button:hover {
    background: #45a049;
}

.empty-container {
    text-align: center;
    padding: 3rem 1rem;
}

.empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
}

.empty-text {
    color: #666;
    font-size: 1rem;
}

.carousel-container {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    max-width: 100%;
    margin: 0 auto;
}

.recipes-swiper {
    padding-bottom: 2.5rem;
    width: 100%;
    box-sizing: border-box;
    overflow: visible;
}

/* Recipe Slide */
.receta-slide {
    background: white;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    overflow: hidden;
    height: 100%;
    border: 1px solid #f0f0f0;
    box-sizing: border-box;
}

.receta-slide:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}

.slide-image-container {
    position: relative;
    overflow: hidden;
    height: 160px;
    width: 100%;
}

.slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.receta-slide:hover .slide-image {
    transform: scale(1.05);
}

.slide-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.receta-slide:hover .slide-overlay {
    opacity: 1;
}

.view-recipe {
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
    border: 2px solid white;
    border-radius: 20px;
    transition: all 0.3s ease;
}

.slide-overlay:hover .view-recipe {
    background: white;
    color: #4CAF50;
}

.slide-content {
    padding: 1rem;
    box-sizing: border-box;
}

.slide-title {
    color: #333;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.6rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 0;
}

.slide-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.slide-category {
    background: #f0fdf4;
    color: #4CAF50;
    padding: 0.2rem 0.6rem;
    border-radius: 10px;
    font-size: 0.7rem;
    font-weight: 500;
    flex-shrink: 0;
}

.slide-rating {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    color: #666;
    font-size: 0.8rem;
}

.star {
    color: #fbbf24;
    font-size: 0.9rem;
}

.rating-value {
    font-weight: 600;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
    color: #4CAF50;
    background: white;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
    background: #4CAF50;
    color: white;
    transform: scale(1.1);
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
    font-size: 12px;
    font-weight: bold;
}

:deep(.swiper-pagination-bullet) {
    background: #4CAF50;
    opacity: 0.3;
    width: 8px;
    height: 8px;
    transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
    opacity: 1;
    transform: scale(1.3);
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@media (min-width: 1025px) {
    .carrusel-section {
        padding: 3rem 0;
        max-width: 1200px;
        margin: 0 auto;
    }

    .section-title {
        font-size: 2.5rem;
    }

    .section-subtitle {
        font-size: 1.1rem;
    }

    .slide-image-container {
        height: 200px;
    }

    .slide-content {
        padding: 1.5rem;
    }

    .slide-title {
        font-size: 1.2rem;
    }

    :deep(.swiper-button-next),
    :deep(.swiper-button-prev) {
        width: 45px;
        height: 45px;
    }

    :deep(.swiper-button-next::after),
    :deep(.swiper-button-prev::after) {
        font-size: 16px;
    }
}

@media (max-width: 1024px) and (min-width: 769px) {
    .carrusel-section {
        max-width: 1000px;

        margin: 0 auto;

    }

    .section-title {
        font-size: 2.2rem;
    }

    .slide-image-container {
        height: 180px;
    }

    .slide-content {
        padding: 1.2rem;
    }

    .slide-title {
        font-size: 1.1rem;
    }
}

@media (max-width: 768px) {
    .carrusel-section {
        padding: 1.5rem 0;
        width: 100%;
        margin-left: calc(-50vw + 50%);
        position: relative;
        left: 0;
        right: 0;
        margin: 0 auto;
        padding: 1.5rem 1rem;
    }

    .section-header {
        margin-bottom: 1.5rem;
        padding: 0 1rem;

    }

    .section-title {
        font-size: 1.8rem;
    }

    .section-subtitle {
        font-size: 0.9rem;
    }

    .carousel-container {
        padding: 0;
        width: 100%;
        overflow: hidden;
    }

    .slide-image-container {
        height: 140px;
    }

    .slide-content {
        padding: 0.8rem;
    }

    .slide-title {
        font-size: 0.95rem;
        margin-bottom: 0.5rem;
    }

    .slide-meta {
        gap: 0.3rem;
    }

    .slide-category {
        font-size: 0.65rem;
        padding: 0.15rem 0.5rem;
    }

    .slide-rating {
        font-size: 0.75rem;
    }

    :deep(.swiper-button-next),
    :deep(.swiper-button-prev) {
        width: 30px;
        height: 30px;
    }

    :deep(.swiper-button-next::after),
    :deep(.swiper-button-prev::after) {
        font-size: 10px;
    }
}

@media (max-width: 480px) {
    .carrusel-section {
        padding: 1rem 0;
    }

    .section-header {
        padding: 0 0.5rem;
        margin-bottom: 1rem;
    }

    .section-title {
        font-size: 1.5rem;
    }

    .section-subtitle {
        font-size: 0.85rem;
    }

    .slide-image-container {
        height: 120px;
    }

    .slide-content {
        padding: 0.6rem;
    }

    .slide-title {
        font-size: 0.9rem;
    }

    .slide-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.3rem;
    }

    .slide-category {
        font-size: 0.6rem;
    }

    :deep(.swiper-button-next),
    :deep(.swiper-button-prev) {
        display: none;
    }

    :deep(.swiper-pagination-bullet) {
        width: 6px;
        height: 6px;
    }
}

@media (max-width: 360px) {
    .section-title {
        font-size: 1.3rem;
    }

    .slide-image-container {
        height: 100px;
    }

    .slide-content {
        padding: 0.5rem;
    }

    .slide-title {
        font-size: 0.85rem;
    }
}

@media (prefers-reduced-motion: reduce) {

    .receta-slide,
    .slide-image,
    .slide-overlay {
        transition: none;
    }

    .receta-slide:hover {
        transform: none;
    }

    .receta-slide:hover .slide-image {
        transform: none;
    }
}
</style>